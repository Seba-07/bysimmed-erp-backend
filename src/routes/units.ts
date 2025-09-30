import { Router } from 'express';
import { Unit } from '../models/Unit.js';

const router = Router();

// GET - Obtener todas las unidades
router.get('/', async (req, res) => {
  try {
    const units = await Unit.find().sort({ nombre: 1 });
    res.json({
      success: true,
      count: units.length,
      data: units
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener unidades',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener una unidad por ID
router.get('/:id', async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: 'Unidad no encontrada'
      });
    }

    res.json({
      success: true,
      data: unit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener unidad',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear una nueva unidad
router.post('/', async (req, res) => {
  try {
    const { nombre, abreviatura, tipo } = req.body;

    if (!nombre || !abreviatura) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre y abreviatura son requeridos'
      });
    }

    const newUnit = new Unit({
      nombre,
      abreviatura,
      tipo
    });

    const savedUnit = await newUnit.save();

    res.status(201).json({
      success: true,
      message: 'Unidad creada exitosamente',
      data: savedUnit
    });
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una unidad con ese nombre o abreviatura'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear unidad',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar una unidad
router.put('/:id', async (req, res) => {
  try {
    const { nombre, abreviatura, tipo } = req.body;

    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: 'Unidad no encontrada'
      });
    }

    if (nombre) unit.nombre = nombre;
    if (abreviatura) unit.abreviatura = abreviatura;
    if (tipo !== undefined) unit.tipo = tipo;

    const updatedUnit = await unit.save();

    res.json({
      success: true,
      message: 'Unidad actualizada exitosamente',
      data: updatedUnit
    });
  } catch (error) {
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una unidad con ese nombre o abreviatura'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar unidad',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar una unidad
router.delete('/:id', async (req, res) => {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: 'Unidad no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Unidad eliminada exitosamente',
      data: unit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar unidad',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;