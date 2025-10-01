import mongoose, { Schema, Document } from 'mongoose';

export interface IPresentacion {
  nombre: string;
  factorConversion: number;
  precioCompra?: number;
}

export interface IMaterial extends Document {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  categoria: 'Accesorios' | 'Aditivos' | 'Filamentos' | 'Limpieza' | 'Pegamentos' | 'Resina' | 'Silicona';
  unidadBase: mongoose.Types.ObjectId | string;
  stock: number;
  precioUnitario: number;
  presentaciones: IPresentacion[];
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
  categoria: {
    type: String,
    enum: ['Accesorios', 'Aditivos', 'Filamentos', 'Limpieza', 'Pegamentos', 'Resina', 'Silicona'],
    required: [true, 'La categoría es requerida'],
    default: 'Silicona'
  },
  unidadBase: {
    type: Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'La unidad base es requerida']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0,
    comment: 'Stock siempre en unidad base (ej: gramos, ml, unidades)'
  },
  presentaciones: [{
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    factorConversion: {
      type: Number,
      required: true,
      min: [0, 'El factor de conversión debe ser positivo'],
      comment: 'Cuántas unidades base tiene esta presentación (ej: 1 frasco = 900 gramos)'
    },
    precioCompra: {
      type: Number,
      min: [0, 'El precio no puede ser negativo'],
      default: 0,
      comment: 'Precio de compra de esta presentación'
    }
  }],
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