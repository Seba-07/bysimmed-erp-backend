import { Router } from 'express';
import { Material } from '../models/Material.js';

const router = Router();

// GET - Obtener todos los materiales
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find()
      .populate('unidadBase', 'nombre abreviatura')
      .sort({ fechaCreacion: -1 });
    res.json({
      success: true,
      count: materials.length,
      data: materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener materiales',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener un material por ID
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('unidadBase', 'nombre abreviatura');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener material',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear un nuevo material
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, categoria, unidadBase, stock, precioUnitario, presentaciones } = req.body;

    if (!nombre || !unidadBase) {
      return res.status(400).json({
        success: false,
        message: 'Los campos nombre y unidadBase son requeridos'
      });
    }

    const newMaterial = new Material({
      nombre,
      descripcion,
      imagen,
      categoria: categoria || 'Silicona',
      unidadBase,
      stock: stock || 0,
      precioUnitario: precioUnitario || 0,
      presentaciones: presentaciones || []
    });

    const savedMaterial = await newMaterial.save();

    res.status(201).json({
      success: true,
      message: 'Material creado exitosamente',
      data: savedMaterial
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
        message: 'Ya existe un material con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear material',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar un material
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, categoria, unidadBase, stock, precioUnitario, presentaciones } = req.body;

    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    if (nombre) material.nombre = nombre;
    if (descripcion !== undefined) material.descripcion = descripcion;
    if (imagen !== undefined) material.imagen = imagen;
    if (categoria) material.categoria = categoria;
    if (unidadBase) material.unidadBase = unidadBase;
    if (stock !== undefined) material.stock = stock;
    if (precioUnitario !== undefined) material.precioUnitario = precioUnitario;
    if (presentaciones !== undefined) material.presentaciones = presentaciones;

    const updatedMaterial = await material.save();

    res.json({
      success: true,
      message: 'Material actualizado exitosamente',
      data: updatedMaterial
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
        message: 'Ya existe un material con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar material',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar un material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Material eliminado exitosamente',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar material',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;