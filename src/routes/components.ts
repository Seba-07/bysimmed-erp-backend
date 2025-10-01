import { Router } from 'express';
import { Component } from '../models/Component.js';
import { Material } from '../models/Material.js';

const router = Router();

// GET - Obtener todos los componentes (con populate de materiales)
router.get('/', async (req, res) => {
  try {
    const components = await Component.find()
      .populate({
        path: 'materiales.materialId',
        select: 'nombre unidadBase precioUnitario presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      })
      .sort({ fechaCreacion: -1 });

    res.json({
      success: true,
      count: components.length,
      data: components
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener componentes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener un componente por ID
router.get('/:id', async (req, res) => {
  try {
    const component = await Component.findById(req.params.id)
      .populate({
        path: 'materiales.materialId',
        select: 'nombre unidadBase precioUnitario presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      });

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Componente no encontrado'
      });
    }

    res.json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener componente',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear un nuevo componente
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, materiales, stock, precioUnitario } = req.body;

    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre es requerido'
      });
    }

    // Validar que los materiales existen
    if (materiales && materiales.length > 0) {
      const materialIds = materiales.map((m: any) => m.materialId);
      const existingMaterials = await Material.find({ _id: { $in: materialIds } });

      if (existingMaterials.length !== materialIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Uno o más materiales no existen'
        });
      }
    }

    const newComponent = new Component({
      nombre,
      descripcion,
      imagen,
      materiales: materiales || [],
      stock: stock || 0,
      precioUnitario: precioUnitario || 0
    });

    const savedComponent = await newComponent.save();
    const populatedComponent = await Component.findById(savedComponent._id)
      .populate({
        path: 'materiales.materialId',
        select: 'nombre unidadBase precioUnitario presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Componente creado exitosamente',
      data: populatedComponent
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
        message: 'Ya existe un componente con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear componente',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar un componente
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, imagen, materiales, stock, precioUnitario } = req.body;

    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Componente no encontrado'
      });
    }

    // Validar que los materiales existen
    if (materiales && materiales.length > 0) {
      const materialIds = materiales.map((m: any) => m.materialId);
      const existingMaterials = await Material.find({ _id: { $in: materialIds } });

      if (existingMaterials.length !== materialIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Uno o más materiales no existen'
        });
      }
    }

    if (nombre) component.nombre = nombre;
    if (descripcion !== undefined) component.descripcion = descripcion;
    if (imagen !== undefined) component.imagen = imagen;
    if (materiales !== undefined) component.materiales = materiales;
    if (stock !== undefined) component.stock = stock;
    if (precioUnitario !== undefined) component.precioUnitario = precioUnitario;

    const updatedComponent = await component.save();
    const populatedComponent = await Component.findById(updatedComponent._id)
      .populate({
        path: 'materiales.materialId',
        select: 'nombre unidadBase precioUnitario presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      });

    res.json({
      success: true,
      message: 'Componente actualizado exitosamente',
      data: populatedComponent
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
        message: 'Ya existe un componente con ese nombre'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar componente',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar un componente
router.delete('/:id', async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Componente no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Componente eliminado exitosamente',
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar componente',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;