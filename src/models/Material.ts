import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  unidad: string; // ej: kg, litros, unidades, metros, etc.
  stock: number;
  precioUnitario: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const MaterialSchema = new Schema<IMaterial>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    unique: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  imagen: {
    type: String,
    default: null
  },
  unidad: {
    type: String,
    required: [true, 'La unidad es requerida'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  precioUnitario: {
    type: Number,
    required: [true, 'El precio unitario es requerido'],
    min: [0, 'El precio no puede ser negativo'],
    default: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar fechaActualizacion
MaterialSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export const Material = mongoose.model<IMaterial>('Material', MaterialSchema);