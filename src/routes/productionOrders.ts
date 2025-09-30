import { Router } from 'express';
import { ProductionOrder } from '../models/ProductionOrder.js';

const router = Router();

// GET - Obtener todas las órdenes (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const { estado, prioridad } = req.query;

    let filter: any = {};
    if (estado) filter.estado = estado;
    if (prioridad) filter.prioridad = prioridad;

    const orders = await ProductionOrder.find(filter)
      .populate('itemId')
      .sort({ fechaLimite: 1, prioridad: -1 }); // Ordenar por fecha límite y prioridad

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener órdenes de fabricación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener una orden por ID
router.get('/:id', async (req, res) => {
  try {
    const order = await ProductionOrder.findById(req.params.id).populate('itemId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden de fabricación no encontrada'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener orden de fabricación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear una nueva orden de fabricación
router.post('/', async (req, res) => {
  try {
    const { itemId, itemType, itemName, cantidad, fechaLimite, prioridad, notas } = req.body;

    if (!itemId || !itemType || !itemName || !cantidad || !fechaLimite) {
      return res.status(400).json({
        success: false,
        message: 'Los campos itemId, itemType, itemName, cantidad y fechaLimite son requeridos'
      });
    }

    const newOrder = new ProductionOrder({
      itemId,
      itemType,
      itemName,
      cantidad,
      fechaLimite,
      prioridad: prioridad || 'media',
      notas,
      estado: 'pendiente'
    });

    const savedOrder = await newOrder.save();
    const populatedOrder = await ProductionOrder.findById(savedOrder._id).populate('itemId');

    res.status(201).json({
      success: true,
      message: 'Orden de fabricación creada exitosamente',
      data: populatedOrder
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear orden de fabricación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar una orden de fabricación
router.put('/:id', async (req, res) => {
  try {
    const { cantidad, fechaLimite, estado, prioridad, notas } = req.body;

    const order = await ProductionOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden de fabricación no encontrada'
      });
    }

    if (cantidad !== undefined) order.cantidad = cantidad;
    if (fechaLimite) order.fechaLimite = fechaLimite;
    if (estado) order.estado = estado;
    if (prioridad) order.prioridad = prioridad;
    if (notas !== undefined) order.notas = notas;

    const updatedOrder = await order.save();
    const populatedOrder = await ProductionOrder.findById(updatedOrder._id).populate('itemId');

    res.json({
      success: true,
      message: 'Orden de fabricación actualizada exitosamente',
      data: populatedOrder
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar orden de fabricación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar una orden de fabricación
router.delete('/:id', async (req, res) => {
  try {
    const order = await ProductionOrder.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden de fabricación no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Orden de fabricación eliminada exitosamente',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar orden de fabricación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PATCH - Cambiar estado de una orden
router.patch('/:id/estado', async (req, res) => {
  try {
    const { estado } = req.body;

    if (!estado || !['pendiente', 'en_proceso', 'completado', 'cancelado'].includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido'
      });
    }

    const order = await ProductionOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden de fabricación no encontrada'
      });
    }

    order.estado = estado;
    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: `Estado actualizado a ${estado}`,
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estado',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;