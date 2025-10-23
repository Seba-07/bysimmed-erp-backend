import { Router } from 'express'
import Cotizacion from '../models/Cotizacion.js'

const router = Router()

// GET all cotizaciones
router.get('/', async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find().sort({ createdAt: -1 })
    res.json(cotizaciones)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error })
  }
})

// GET single cotizacion
router.get('/:id', async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id)
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' })
    }
    res.json(cotizacion)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotización', error })
  }
})

// POST new cotizacion
router.post('/', async (req, res) => {
  try {
    const cotizacion = new Cotizacion(req.body)
    const savedCotizacion = await cotizacion.save()
    res.status(201).json(savedCotizacion)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear cotización', error })
  }
})

// PUT update cotizacion
router.put('/:id', async (req, res) => {
  try {
    const updatedCotizacion = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedCotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' })
    }
    res.json(updatedCotizacion)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar cotización', error })
  }
})

// DELETE cotizacion
router.delete('/:id', async (req, res) => {
  try {
    const deletedCotizacion = await Cotizacion.findByIdAndDelete(req.params.id)
    if (!deletedCotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' })
    }
    res.json({ message: 'Cotización eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cotización', error })
  }
})

export default router
