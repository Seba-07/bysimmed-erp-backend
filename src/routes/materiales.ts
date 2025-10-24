import express from 'express'
import Material from '../models/Material.js'

const router = express.Router()

// GET next codigo
router.get('/next-codigo', async (req, res) => {
  try {
    const lastMaterial = await Material.findOne().sort({ codigo: -1 })
    let nextNum = 1

    if (lastMaterial && lastMaterial.codigo) {
      const match = lastMaterial.codigo.match(/MAT(\d+)/)
      if (match) {
        nextNum = parseInt(match[1]) + 1
      }
    }

    const codigo = `MAT${String(nextNum).padStart(4, '0')}`
    res.json({ codigo })
  } catch (error) {
    res.status(500).json({ message: 'Error al generar código', error })
  }
})

// GET all materials
router.get('/', async (req, res) => {
  try {
    const materiales = await Material.find().sort({ nombre: 1 })
    res.json(materiales)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materiales', error })
  }
})

// GET single material
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' })
    }
    res.json(material)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener material', error })
  }
})

// POST new material
router.post('/', async (req, res) => {
  try {
    const material = new Material(req.body)
    await material.save()
    res.status(201).json(material)
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código ya existe' })
    }
    res.status(400).json({ message: 'Error al crear material', error })
  }
})

// PUT update material
router.put('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' })
    }
    res.json(material)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar material', error })
  }
})

// DELETE material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id)
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' })
    }
    res.json({ message: 'Material eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar material', error })
  }
})

export default router
