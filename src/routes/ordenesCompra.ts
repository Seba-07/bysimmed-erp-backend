import { Router } from 'express'
import OrdenCompra from '../models/OrdenCompra.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const ordenes = await OrdenCompra.find().sort({ createdAt: -1 })
    res.json(ordenes)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes de compra', error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const orden = await OrdenCompra.findById(req.params.id)
    if (!orden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' })
    }
    res.json(orden)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener orden de compra', error })
  }
})

router.post('/', async (req, res) => {
  try {
    const orden = new OrdenCompra(req.body)
    const savedOrden = await orden.save()
    res.status(201).json(savedOrden)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear orden de compra', error })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedOrden = await OrdenCompra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedOrden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' })
    }
    res.json(updatedOrden)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar orden de compra', error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrden = await OrdenCompra.findByIdAndDelete(req.params.id)
    if (!deletedOrden) {
      return res.status(404).json({ message: 'Orden de compra no encontrada' })
    }
    res.json({ message: 'Orden de compra eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar orden de compra', error })
  }
})

export default router
