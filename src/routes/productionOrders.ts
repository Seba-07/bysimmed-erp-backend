import { Router } from 'express';
import { ProductionOrder } from '../models/ProductionOrder.js';
import { Component } from '../models/Component.js';
import { Model } from '../models/Model.js';

const router = Router();

// GET - Obtener todas las órdenes (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const { estado, cliente } = req.query;

    let filter: any = {};
    if (estado) filter.estado = estado;
    if (cliente) filter.cliente = new RegExp(cliente as string, 'i');

    const orders = await ProductionOrder.find(filter)
      .sort({ fechaLimite: 1, fechaCreacion: -1 });

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
    const order = await ProductionOrder.findById(req.params.id);

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

// GET - Obtener componentes de un modelo
router.get('/model/:modelId/components', async (req, res) => {
  try {
    const model = await Model.findById(req.params.modelId).populate('componentes.componenteId');

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Modelo no encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        modelId: model._id,
        modelName: model.nombre,
        componentes: model.componentes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener componentes del modelo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear una nueva orden de fabricación
router.post('/', async (req, res) => {
  try {
    const { cliente, productos, fechaLimite, notas } = req.body;

    if (!cliente || !productos || !Array.isArray(productos) || productos.length === 0 || !fechaLimite) {
      return res.status(400).json({
        success: false,
        message: 'Los campos cliente, productos (array no vacío) y fechaLimite son requeridos'
      });
    }

    // Validar que cada producto tenga los campos necesarios
    for (const producto of productos) {
      if (!producto.itemId || !producto.itemType || !producto.itemName || !producto.cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Cada producto debe tener itemId, itemType, itemName y cantidad'
        });
      }
    }

    const newOrder = new ProductionOrder({
      cliente,
      productos,
      fechaLimite,
      notas,
      estado: 'activa'
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Orden de fabricación creada exitosamente',
      data: savedOrder
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
    const { cliente, productos, fechaLimite, estado, notas } = req.body;

    const order = await ProductionOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden de fabricación no encontrada'
      });
    }

    if (cliente !== undefined) order.cliente = cliente;
    if (productos !== undefined) order.productos = productos;
    if (fechaLimite) order.fechaLimite = fechaLimite;
    if (estado) order.estado = estado;
    if (notas !== undefined) order.notas = notas;

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Orden de fabricación actualizada exitosamente',
      data: updatedOrder
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

    if (!estado || !['activa', 'en_proceso', 'completada', 'cancelada'].includes(estado)) {
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