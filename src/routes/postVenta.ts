import { Router } from 'express'
import ClientePostVenta from '../models/ClientePostVenta.js'
import EquipoPostVenta from '../models/EquipoPostVenta.js'

const router = Router()

// ===== CLIENTES =====
router.get('/clientes', async (req, res) => {
  try {
    const clientes = await ClientePostVenta.find().sort({ createdAt: -1 })
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error })
  }
})

router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await ClientePostVenta.findById(req.params.id)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error })
  }
})

router.post('/clientes', async (req, res) => {
  try {
    const cliente = new ClientePostVenta(req.body)
    const savedCliente = await cliente.save()
    res.status(201).json(savedCliente)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear cliente', error })
  }
})

router.put('/clientes/:id', async (req, res) => {
  try {
    const updatedCliente = await ClientePostVenta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedCliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json(updatedCliente)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar cliente', error })
  }
})

router.delete('/clientes/:id', async (req, res) => {
  try {
    const deletedCliente = await ClientePostVenta.findByIdAndDelete(req.params.id)
    if (!deletedCliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json({ message: 'Cliente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error })
  }
})

// ===== EQUIPOS =====
router.get('/equipos', async (req, res) => {
  try {
    const equipos = await EquipoPostVenta.find().sort({ createdAt: -1 })
    res.json(equipos)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener equipos', error })
  }
})

router.get('/equipos/:id', async (req, res) => {
  try {
    const equipo = await EquipoPostVenta.findById(req.params.id)
    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' })
    }
    res.json(equipo)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener equipo', error })
  }
})

router.post('/equipos', async (req, res) => {
  try {
    const equipo = new EquipoPostVenta(req.body)
    const savedEquipo = await equipo.save()
    res.status(201).json(savedEquipo)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear equipo', error })
  }
})

router.put('/equipos/:id', async (req, res) => {
  try {
    const updatedEquipo = await EquipoPostVenta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedEquipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' })
    }
    res.json(updatedEquipo)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar equipo', error })
  }
})

router.delete('/equipos/:id', async (req, res) => {
  try {
    const deletedEquipo = await EquipoPostVenta.findByIdAndDelete(req.params.id)
    if (!deletedEquipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' })
    }
    res.json({ message: 'Equipo eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar equipo', error })
  }
})

export default router
