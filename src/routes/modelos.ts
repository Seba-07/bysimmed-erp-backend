import express from 'express'
import Modelo from '../models/Modelo.js'
import { uploadModeloPDF } from '../config/multer.js'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// GET next codigo
router.get('/next-codigo', async (req, res) => {
  try {
    const lastModelo = await Modelo.findOne().sort({ codigo: -1 })
    let nextNum = 1

    if (lastModelo && lastModelo.codigo) {
      const match = lastModelo.codigo.match(/MOD(\d+)/)
      if (match) {
        nextNum = parseInt(match[1]) + 1
      }
    }

    const codigo = `MOD${String(nextNum).padStart(4, '0')}`
    res.json({ codigo })
  } catch (error) {
    res.status(500).json({ message: 'Error al generar código', error })
  }
})

// GET all models
router.get('/', async (req, res) => {
  try {
    const modelos = await Modelo.find().sort({ nombre: 1 })
    res.json(modelos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener modelos', error })
  }
})

// GET single model
router.get('/:id', async (req, res) => {
  try {
    const modelo = await Modelo.findById(req.params.id)
    if (!modelo) {
      return res.status(404).json({ message: 'Modelo no encontrado' })
    }
    res.json(modelo)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener modelo', error })
  }
})

// POST new model
router.post('/', async (req, res) => {
  try {
    const modelo = new Modelo(req.body)
    await modelo.save()
    res.status(201).json(modelo)
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código ya existe' })
    }
    res.status(400).json({ message: 'Error al crear modelo', error })
  }
})

// PUT update model
router.put('/:id', async (req, res) => {
  try {
    const modelo = await Modelo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!modelo) {
      return res.status(404).json({ message: 'Modelo no encontrado' })
    }
    res.json(modelo)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar modelo', error })
  }
})

// DELETE model
router.delete('/:id', async (req, res) => {
  try {
    const modelo = await Modelo.findByIdAndDelete(req.params.id)
    if (!modelo) {
      return res.status(404).json({ message: 'Modelo no encontrado' })
    }

    // Eliminar PDF técnico si existe
    if (modelo.pdfTecnico) {
      const pdfPath = path.join(process.cwd(), modelo.pdfTecnico)
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath)
      }
    }

    res.json({ message: 'Modelo eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar modelo', error })
  }
})

// POST upload PDF técnico
router.post('/:id/upload-pdf', uploadModeloPDF.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó archivo PDF' })
    }

    const modelo = await Modelo.findById(req.params.id)
    if (!modelo) {
      // Eliminar archivo subido si el modelo no existe
      fs.unlinkSync(req.file.path)
      return res.status(404).json({ message: 'Modelo no encontrado' })
    }

    // Eliminar PDF anterior si existe
    if (modelo.pdfTecnico) {
      const oldPdfPath = path.join(process.cwd(), modelo.pdfTecnico)
      if (fs.existsSync(oldPdfPath)) {
        fs.unlinkSync(oldPdfPath)
      }
    }

    // Actualizar ruta del PDF
    modelo.pdfTecnico = req.file.path
    await modelo.save()

    res.json({ message: 'PDF técnico subido correctamente', pdfTecnico: modelo.pdfTecnico })
  } catch (error) {
    // Eliminar archivo si hubo error
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({ message: 'Error al subir PDF', error })
  }
})

// GET download PDF técnico
router.get('/:id/pdf', async (req, res) => {
  try {
    const modelo = await Modelo.findById(req.params.id)
    if (!modelo) {
      return res.status(404).json({ message: 'Modelo no encontrado' })
    }

    if (!modelo.pdfTecnico) {
      return res.status(404).json({ message: 'Este modelo no tiene PDF técnico' })
    }

    const pdfPath = path.join(process.cwd(), modelo.pdfTecnico)
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: 'Archivo PDF no encontrado' })
    }

    res.sendFile(pdfPath)
  } catch (error) {
    res.status(500).json({ message: 'Error al descargar PDF', error })
  }
})

export default router
