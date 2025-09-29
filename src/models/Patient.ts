import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  nombre: string;
  email: string;
  telefono: string;
  fechaCreacion: Date;
}

const PatientSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Formato de email inválido']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true,
    maxlength: [20, 'El teléfono no puede exceder 20 caracteres']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

export const Patient = mongoose.model<IPatient>('Patient', PatientSchema);