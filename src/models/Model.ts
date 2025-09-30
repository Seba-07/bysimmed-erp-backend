import mongoose, { Schema, Document } from 'mongoose';

interface ComponentItem {
  componentId: mongoose.Types.ObjectId;
  cantidad: number;
}

export interface IModel extends Document {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  componentes: ComponentItem[];
  stock: number;
  precioUnitario: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

const ModelSchema = new Schema<IModel>({
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
  componentes: [{
    componentId: {
      type: Schema.Types.ObjectId,
      ref: 'Component',
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
ModelSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export const Model = mongoose.model<IModel>('Model', ModelSchema);