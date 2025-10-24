import express from 'express'
import Cliente from '../models/Cliente.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ nombre: 1 })
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error })
  }
})

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error })
  }
})

// Crear nuevo cliente
router.post('/', async (req, res) => {
  try {
    // Verificar si el código de cliente ya existe
    const existente = await Cliente.findOne({ codigoCliente: req.body.codigoCliente?.toUpperCase() })
    if (existente) {
      return res.status(400).json({ message: 'El código de cliente ya existe' })
    }

    const cliente = new Cliente({
      ...req.body,
      codigoCliente: req.body.codigoCliente?.toUpperCase()
    })
    await cliente.save()
    res.status(201).json(cliente)
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El código de cliente ya existe' })
    }
    res.status(400).json({ message: 'Error al crear cliente', error })
  }
})

// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    // Si se está actualizando el código, verificar que no exista
    if (req.body.codigoCliente) {
      const existente = await Cliente.findOne({
        codigoCliente: req.body.codigoCliente?.toUpperCase(),
        _id: { $ne: req.params.id }
      })
      if (existente) {
        return res.status(400).json({ message: 'El código de cliente ya existe' })
      }
      req.body.codigoCliente = req.body.codigoCliente.toUpperCase()
    }

    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json(cliente)
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar cliente', error })
  }
})

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id)
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    res.json({ message: 'Cliente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error })
  }
})

// Generar código de cliente sugerido
router.post('/generar-codigo', async (req, res) => {
  try {
    const { nombre } = req.body
    if (!nombre) {
      return res.status(400).json({ message: 'Nombre requerido' })
    }

    // Generar código basado en las primeras letras del nombre
    let codigo = nombre
      .trim()
      .substring(0, 4)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')

    // Si es muy corto, rellenar con números
    if (codigo.length < 2) {
      codigo = nombre.substring(0, 1).toUpperCase() + '001'
    }

    // Verificar si existe y agregar número si es necesario
    let codigoFinal = codigo
    let contador = 1
    while (await Cliente.findOne({ codigoCliente: codigoFinal })) {
      codigoFinal = codigo.substring(0, 3) + contador
      contador++
      if (contador > 99) break
    }

    res.json({ codigoCliente: codigoFinal.substring(0, 4) })
  } catch (error) {
    res.status(500).json({ message: 'Error al generar código', error })
  }
})

export default router
