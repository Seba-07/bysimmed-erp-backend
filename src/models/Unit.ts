import mongoose, { Schema, Document } from 'mongoose';

export interface IUnit extends Document {
  nombre: string;
  abreviatura: string;
  tipo?: string; // ej: peso, volumen, longitud, cantidad
  fechaCreacion: Date;
}

const UnitSchema = new Schema<IUnit>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    unique: true
  },
  abreviatura: {
    type: String,
    required: [true, 'La abreviatura es requerida'],
    trim: true,
    unique: true
  },
  tipo: {
    type: String,
    trim: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

export const Unit = mongoose.model<IUnit>('Unit', UnitSchema);