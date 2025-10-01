import mongoose, { Schema, Document } from 'mongoose';

export interface IRestockRequest extends Document {
  materialId: mongoose.Types.ObjectId;
  presentacion: string;
  cantidad: number;
  estado: 'pendiente' | 'procesada' | 'cancelada';
  fechaSolicitud: Date;
  fechaProcesada?: Date;
  notas?: string;
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
  estado: {
    type: String,
    enum: ['pendiente', 'procesada', 'cancelada'],
    default: 'pendiente'
  },
  fechaSolicitud: {
    type: Date,
    default: Date.now
  },
  fechaProcesada: {
    type: Date
  },
  notas: {
    type: String,
    trim: true
  }
});

export const RestockRequest = mongoose.model<IRestockRequest>('RestockRequest', RestockRequestSchema);
