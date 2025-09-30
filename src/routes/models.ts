import { Router } from 'express';
import { Model } from '../models/Model.js';
import { Component } from '../models/Component.js';

const router = Router();

// GET - Obtener todos los modelos (con populate de componentes)
router.get('/', async (req, res) => {
  try {
    const models = await Model.find()
      .populate({
        path: 'componentes.componentId',
        select: 'nombre precioUnitario',
        populate: {
          path: 'materiales.materialId',
          select: 'nombre unidad'
        }
      })
      .sort({ fechaCreacion: -1 });

    res.json({
      success: true,
      count: models.length,
      data: models
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener modelos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener un modelo por ID
router.get('/:id', async (req, res) => {
  try {
    const model = await Model.findById(req.params.id)
      .populate({
        path: 'componentes.componentId',
        select: 'nombre precioUnitario',
        populate: {
          path: 'materiales.materialId',
          select: 'nombre unidad'
        }
      });

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Modelo no encontrado'
      });
    }

    res.json({
      success: true,
      data: model
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener modelo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear un nuevo modelo
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, componentes, stock, precioUnitario } = req.body;

    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre es requerido'
      });
    }

    // Validar que los componentes existen
    if (componentes && componentes.length > 0) {
      const componentIds = componentes.map((c: any) => c.componentId);
      const existingComponents = await Component.find({ _id: { $in: componentIds } });

      if (existingComponents.length !== componentIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Uno o más componentes no existen'
        });
      }
    }

    const newModel = new Model({
      nombre,
      descripcion,
      imagen,
      componentes: componentes || [],
      stock: stock || 0,
      precioUnitario: precioUnitario || 0
    });

    const savedModel = await newModel.save();
    const populatedModel = await Model.findById(savedModel._id)
      .populate({
        path: 'componentes.componentId',
        select: 'nombre precioUnitario',
        populate: {
          path: 'materiales.materialId',
          select: 'nombre unidad'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Modelo creado exitosamente',
      data: populatedModel
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        error: error.message
      });
    }

    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un modelo con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear modelo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar un modelo
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, componentes, stock, precioUnitario } = req.body;

    const model = await Model.findById(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Modelo no encontrado'
      });
    }

    // Validar que los componentes existen
    if (componentes && componentes.length > 0) {
      const componentIds = componentes.map((c: any) => c.componentId);
      const existingComponents = await Component.find({ _id: { $in: componentIds } });

      if (existingComponents.length !== componentIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Uno o más componentes no existen'
        });
      }
    }

    if (nombre) model.nombre = nombre;
    if (descripcion !== undefined) model.descripcion = descripcion;
    if (imagen !== undefined) model.imagen = imagen;
    if (componentes !== undefined) model.componentes = componentes;
    if (stock !== undefined) model.stock = stock;
    if (precioUnitario !== undefined) model.precioUnitario = precioUnitario;

    const updatedModel = await model.save();
    const populatedModel = await Model.findById(updatedModel._id)
      .populate({
        path: 'componentes.componentId',
        select: 'nombre precioUnitario',
        populate: {
          path: 'materiales.materialId',
          select: 'nombre unidad'
        }
      });

    res.json({
      success: true,
      message: 'Modelo actualizado exitosamente',
      data: populatedModel
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        error: error.message
      });
    }

    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un modelo con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar modelo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar un modelo
router.delete('/:id', async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Modelo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Modelo eliminado exitosamente',
      data: model
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar modelo',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;