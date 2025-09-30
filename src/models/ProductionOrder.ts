import mongoose, { Schema, Document } from 'mongoose';

export interface IProductionOrder extends Document {
  itemId: mongoose.Types.ObjectId;
  itemType: 'Component' | 'Model';
  itemName: string; // Guardamos el nombre para referencia rápida
  cantidad: number;
  fechaLimite: Date;
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  notas?: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaCompletado?: Date;
}

const ProductionOrderSchema = new Schema<IProductionOrder>({
  itemId: {
    type: Schema.Types.ObjectId,
    required: [true, 'El ID del item es requerido'],
    refPath: 'itemType'
  },
  itemType: {
    type: String,
    required: [true, 'El tipo de item es requerido'],
    enum: ['Component', 'Model']
  },
  itemName: {
    type: String,
    required: [true, 'El nombre del item es requerido'],
    trim: true
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [1, 'La cantidad debe ser al menos 1']
  },
  fechaLimite: {
    type: Date,
    required: [true, 'La fecha límite es requerida']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'],
    default: 'pendiente'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta', 'urgente'],
    default: 'media'
  },
  notas: {
    type: String,
    trim: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  },
  fechaCompletado: {
    type: Date
  }
});

// Middleware para actualizar fechaActualizacion
ProductionOrderSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();

  // Si el estado cambia a completado, guardar la fecha
  if (this.isModified('estado') && this.estado === 'completado' && !this.fechaCompletado) {
    this.fechaCompletado = new Date();
  }

  next();
});

// Índices para búsquedas optimizadas
ProductionOrderSchema.index({ estado: 1, fechaLimite: 1 });
ProductionOrderSchema.index({ itemId: 1, itemType: 1 });

export const ProductionOrder = mongoose.model<IProductionOrder>('ProductionOrder', ProductionOrderSchema);