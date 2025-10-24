import express from 'express'
import Componente from '../models/Componente.js'

const router = express.Router()

// GET all components
router.get('/', async (req, res) => {
  try {
    const componentes = await Componente.find().sort({ nombre: 1 })
    res.json(componentes)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener componentes', error })
  }
})

// GET single component
router.get('/:id', async (req, res) => {
  try {
    const componente = await Componente.findById(req.params.id)
    if (!componente) {
      return res.status(404).json({ message: 'Componente no encontrado' })
    }
    res.json(componente)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener componente', error })
  }
})

// POST new component
router.post('/', async (req, res) => {
  try {
    const componente = new Componente(req.body)
    await componente.save()
    res.status(201).json(componente)
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código ya existe' })
    }
    res.status(400).json({ message: 'Error al crear componente', error })
  }
})

// PUT update component
router.put('/:id', async (req, res) => {
  try {
    const componente = await Componente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!componente) {
      return res.status(404).json({ message: 'Componente no encontrado' })
    }
    res.json(componente)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar componente', error })
  }
})

// DELETE component
router.delete('/:id', async (req, res) => {
  try {
    const componente = await Componente.findByIdAndDelete(req.params.id)
    if (!componente) {
      return res.status(404).json({ message: 'Componente no encontrado' })
    }
    res.json({ message: 'Componente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar componente', error })
  }
})

export default router
