import { Router } from 'express'
import SolicitudCompra from '../models/SolicitudCompra.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const compras = await SolicitudCompra.find().sort({ createdAt: -1 })
    res.json(compras)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes de compra', error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const compra = await SolicitudCompra.findById(req.params.id)
    if (!compra) {
      return res.status(404).json({ message: 'Solicitud de compra no encontrada' })
    }
    res.json(compra)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitud de compra', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const compra = new SolicitudCompra(req.body)
    const savedCompra = await compra.save()
    res.status(201).json(savedCompra)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear solicitud de compra', error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedCompra = await SolicitudCompra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedCompra) {
      return res.status(404).json({ message: 'Solicitud de compra no encontrada' })
    }
    res.json(updatedCompra)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar solicitud de compra', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedCompra = await SolicitudCompra.findByIdAndDelete(req.params.id)
    if (!deletedCompra) {
      return res.status(404).json({ message: 'Solicitud de compra no encontrada' })
    }
    res.json({ message: 'Solicitud de compra eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar solicitud de compra', error })
  }
})

export default router
