import mongoose, { Schema, Document } from 'mongoose';

interface MaterialItem {
  materialId: mongoose.Types.ObjectId;
  cantidad: number;
}

export interface IComponent extends Document {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  materiales: MaterialItem[];
  stock: number;
  precioUnitario: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ComponentSchema = new Schema<IComponent>({
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
  materiales: [{
    materialId: {
      type: Schema.Types.ObjectId,
      ref: 'Material',
      required: true
    },
    cantidad: {
      type: Number,
      required: [true, 'La cantidad es requerida'],
      min: [0, 'La cantidad no puede ser negativa']
    }
  }],
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
ComponentSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export const Component = mongoose.model<IComponent>('Component', ComponentSchema);