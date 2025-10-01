import { Router } from 'express';
import { RestockRequest } from '../models/RestockRequest.js';
import { Material } from '../models/Material.js';

const router = Router();

// GET - Obtener todas las solicitudes de reposición
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    const filter = estado ? { estado } : {};

    const requests = await RestockRequest.find(filter)
      .populate({
        path: 'materialId',
        select: 'nombre unidadBase presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      })
      .sort({ fechaSolicitud: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitudes de reposición',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET - Obtener solicitudes pendientes por material
router.get('/pending/:materialId', async (req, res) => {
  try {
    const requests = await RestockRequest.find({
      materialId: req.params.materialId,
      estado: 'pendiente'
    }).sort({ fechaSolicitud: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener solicitudes pendientes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST - Crear una nueva solicitud de reposición
router.post('/', async (req, res) => {
  try {
    const { materialId, presentacion, cantidad, solicitante, prioridad, notas } = req.body;

    if (!materialId || !presentacion || !cantidad || !solicitante) {
      return res.status(400).json({
        success: false,
        message: 'Los campos materialId, presentacion, cantidad y solicitante son requeridos'
      });
    }

    // Verificar que el material existe
    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material no encontrado'
      });
    }

    // Verificar que la presentación existe en el material
    const presentacionExists = material.presentaciones.some(
      (p) => p.nombre === presentacion
    );
    if (!presentacionExists) {
      return res.status(400).json({
        success: false,
        message: 'La presentación seleccionada no existe para este material'
      });
    }

    const newRequest = new RestockRequest({
      materialId,
      presentacion,
      cantidad,
      solicitante,
      prioridad: prioridad || 'media',
      notas
    });

    const savedRequest = await newRequest.save();
    const populatedRequest = await RestockRequest.findById(savedRequest._id)
      .populate({
        path: 'materialId',
        select: 'nombre unidadBase presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Solicitud de reposición creada exitosamente',
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear solicitud de reposición',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT - Actualizar estado de una solicitud
router.put('/:id', async (req, res) => {
  try {
    const { estado, notas, notasInternas } = req.body;

    const request = await RestockRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    if (estado) {
      request.estado = estado;
      const now = new Date();

      // Actualizar fechas según el estado
      switch (estado) {
        case 'en_revision':
          request.fechaRevision = now;
          break;
        case 'en_gestion':
          request.fechaGestion = now;
          break;
        case 'en_transito':
          request.fechaTransito = now;
          break;
        case 'entregado':
          request.fechaEntrega = now;
          break;
        case 'cancelada':
          request.fechaCancelacion = now;
          break;
      }
    }
    if (notas !== undefined) request.notas = notas;
    if (notasInternas !== undefined) request.notasInternas = notasInternas;

    const updatedRequest = await request.save();
    const populatedRequest = await RestockRequest.findById(updatedRequest._id)
      .populate({
        path: 'materialId',
        select: 'nombre unidadBase presentaciones',
        populate: {
          path: 'unidadBase',
          select: 'nombre abreviatura'
        }
      });

    res.json({
      success: true,
      message: 'Solicitud actualizada exitosamente',
      data: populatedRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar solicitud',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE - Eliminar una solicitud
router.delete('/:id', async (req, res) => {
  try {
    const request = await RestockRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Solicitud no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Solicitud eliminada exitosamente',
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar solicitud',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;
