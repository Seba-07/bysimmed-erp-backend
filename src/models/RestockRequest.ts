import mongoose, { Schema, Document } from 'mongoose';

export interface IRestockRequest extends Document {
  materialId: mongoose.Types.ObjectId;
  presentacion: string;
  cantidad: number;
  solicitante: string;
  prioridad: 'baja' | 'media' | 'urgente';
  estado: 'pendiente' | 'en_revision' | 'en_gestion' | 'en_transito' | 'entregado' | 'cancelada';
  fechaSolicitud: Date;
  fechaRevision?: Date;
  fechaGestion?: Date;
  fechaTransito?: Date;
  fechaEntrega?: Date;
  fechaCancelacion?: Date;
  notas?: string;
  notasInternas?: string;
}

const RestockRequestSchema = new Schema<IRestockRequest>({
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: [true, 'El material es requerido']
  },
  presentacion: {
    type: String,
    required: [true, 'La presentación es requerida'],
    trim: true,
    comment: 'Nombre de la presentación seleccionada para la compra'
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [1, 'La cantidad debe ser al menos 1']
  },
  solicitante: {
    type: String,
    required: [true, 'El solicitante es requerido'],
    trim: true
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'urgente'],
    required: [true, 'La prioridad es requerida'],
    default: 'media'
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_revision', 'en_gestion', 'en_transito', 'entregado', 'cancelada'],
    default: 'pendiente',
    comment: 'Estados: pendiente → en_revision → en_gestion → en_transito → entregado'
  },
  fechaSolicitud: {
    type: Date,
    default: Date.now
  },
  fechaRevision: {
    type: Date
  },
  fechaGestion: {
    type: Date
  },
  fechaTransito: {
    type: Date
  },
  fechaEntrega: {
    type: Date
  },
  fechaCancelacion: {
    type: Date
  },
  notas: {
    type: String,
    trim: true,
    comment: 'Notas del solicitante'
  },
  notasInternas: {
    type: String,
    trim: true,
    comment: 'Notas internas para gestión'
  }
});

export const RestockRequest = mongoose.model<IRestockRequest>('RestockRequest', RestockRequestSchema);
