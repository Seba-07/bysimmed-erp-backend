import { Router } from 'express'
import Cotizacion from '../models/Cotizacion.js'
import Cliente from '../models/Cliente.js'

const router = Router()

// GET all cotizaciones
router.get('/', async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find()
      .populate('cliente', 'nombre codigoCliente')
      .sort({ createdAt: -1 })
    res.json(cotizaciones)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error })
  }
})

// GET single cotizacion
router.get('/:id', async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id)
      .populate('cliente', 'nombre codigoCliente')
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' })
    }
    res.json(cotizacion)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotización', error })
  }
})

// GET next numero for cliente
router.get('/next-numero/:clienteId', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.clienteId)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // Buscar la última cotización de este cliente
    const ultimaCotizacion = await Cotizacion.findOne({ cliente: req.params.clienteId })
      .sort({ numeroSecuencial: -1 })

    const numeroSecuencial = ultimaCotizacion ? ultimaCotizacion.numeroSecuencial + 1 : 1
    const numero = `${cliente.codigoCliente}-${String(numeroSecuencial).padStart(2, '0')}`

    res.json({ numero, numeroSecuencial, codigoCliente: cliente.codigoCliente })
  } catch (error) {
    res.status(500).json({ message: 'Error al generar número', error })
  }
})

// POST new cotizacion
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.body.cliente)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // Si no viene numeroSecuencial, calcularlo
    if (!req.body.numeroSecuencial) {
      const ultimaCotizacion = await Cotizacion.findOne({ cliente: req.body.cliente })
        .sort({ numeroSecuencial: -1 })
      req.body.numeroSecuencial = ultimaCotizacion ? ultimaCotizacion.numeroSecuencial + 1 : 1
    }

    // Generar el número completo
    if (!req.body.numero) {
      req.body.numero = `${cliente.codigoCliente}-${String(req.body.numeroSecuencial).padStart(2, '0')}`
    }

    req.body.clienteNombre = cliente.nombre

    const cotizacion = new Cotizacion(req.body)
    const savedCotizacion = await cotizacion.save()
    const populated = await Cotizacion.findById(savedCotizacion._id).populate('cliente', 'nombre codigoCliente')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear cotización', error })
  }
})

// PUT update cotizacion
router.put('/:id', async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id)
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada' })
    }

    // Auto-set fechaEnvio when estado changes to 'enviada'
    if (req.body.estado === 'enviada' && cotizacion.estado !== 'enviada' && !req.body.fechaEnvio) {
      req.body.fechaEnvio = new Date()
    }

    // Auto-set fechaAceptacion when estado changes to 'aceptada'
    if (req.body.estado === 'aceptada' && cotizacion.estado !== 'aceptada' && !req.body.fechaAceptacion) {
      req.body.fechaAceptacion = new Date()
    }

    const updatedCotizacion = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('cliente', 'nombre codigoCliente')

    res.json(updatedCotizacion)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar cotización', error })
  }
})

// POST re-cotizar (create a new quotation based on existing one)
router.post('/:id/recotizar', async (req, res) => {
  try {
    const cotizacionOriginal = await Cotizacion.findById(req.params.id).populate('cliente', 'nombre codigoCliente')
    if (!cotizacionOriginal) {
      return res.status(404).json({ message: 'Cotización original no encontrada' })
    }

    // Find highest numeroRecotizacion for this base quotation
    const cotizacionesRelacionadas = await Cotizacion.find({
      cliente: cotizacionOriginal.cliente,
      numeroSecuencial: cotizacionOriginal.numeroSecuencial
    }).sort({ numeroRecotizacion: -1 })

    const nuevoNumeroRecotizacion = cotizacionesRelacionadas.length > 0
      ? cotizacionesRelacionadas[0].numeroRecotizacion + 1
      : 1

    const cliente = await Cliente.findById(cotizacionOriginal.cliente)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    // Generate new numero with re-quotation suffix
    const numeroBase = `${cliente.codigoCliente}-${String(cotizacionOriginal.numeroSecuencial).padStart(2, '0')}`
    const numero = `${numeroBase}-R${nuevoNumeroRecotizacion}`

    // Create new quotation based on original
    const nuevaCotizacion = new Cotizacion({
      numero,
      numeroSecuencial: cotizacionOriginal.numeroSecuencial,
      numeroRecotizacion: nuevoNumeroRecotizacion,
      cliente: cotizacionOriginal.cliente,
      clienteNombre: cotizacionOriginal.clienteNombre,
      fechaSolicitud: new Date(),
      estado: 'solicitada',
      productos: cotizacionOriginal.productos,
      moneda: cotizacionOriginal.moneda,
      monto: cotizacionOriginal.monto,
      notas: req.body.notas || cotizacionOriginal.notas
    })

    const savedCotizacion = await nuevaCotizacion.save()
    const populated = await Cotizacion.findById(savedCotizacion._id).populate('cliente', 'nombre codigoCliente')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ message: 'Error al crear re-cotización', error })
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
