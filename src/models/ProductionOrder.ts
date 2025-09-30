import mongoose, { Schema, Document } from 'mongoose';

// Subdocumento para cada producto en la orden
interface IOrderProduct {
  itemId: mongoose.Types.ObjectId;
  itemType: 'Component' | 'Model';
  itemName: string;
  cantidad: number;
  componentesSeleccionados?: mongoose.Types.ObjectId[]; // Para modelos con componentes personalizados
}

export interface IProductionOrder extends Document {
  numeroOrden: string; // Número único de orden
  cliente: string;
  productos: IOrderProduct[];
  fechaLimite: Date;
  estado: 'activa' | 'en_proceso' | 'completada' | 'cancelada';
  notas?: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaCompletada?: Date;
}

const OrderProductSchema = new Schema<IOrderProduct>({
  itemId: {
    type: Schema.Types.ObjectId,
    required: [true, 'El ID del producto es requerido'],
    refPath: 'productos.itemType'
  },
  itemType: {
    type: String,
    required: [true, 'El tipo de producto es requerido'],
    enum: ['Component', 'Model']
  },
  itemName: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [1, 'La cantidad debe ser al menos 1']
  },
  componentesSeleccionados: [{
    type: Schema.Types.ObjectId,
    ref: 'Component'
  }]
});

const ProductionOrderSchema = new Schema<IProductionOrder>({
  numeroOrden: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cliente: {
    type: String,
    required: [true, 'El cliente es requerido'],
    trim: true
  },
  productos: {
    type: [OrderProductSchema],
    required: true,
    validate: {
      validator: function(v: IOrderProduct[]) {
        return v && v.length > 0;
      },
      message: 'Debe incluir al menos un producto'
    }
  },
  fechaLimite: {
    type: Date,
    required: [true, 'La fecha límite es requerida']
  },
  estado: {
    type: String,
    enum: ['activa', 'en_proceso', 'completada', 'cancelada'],
    default: 'activa'
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
  fechaCompletada: {
    type: Date
  }
});

// Middleware para generar número de orden
ProductionOrderSchema.pre('save', async function(next) {
  this.fechaActualizacion = new Date();

  // Generar número de orden si es nuevo documento
  if (this.isNew && !this.numeroOrden) {
    const count = await mongoose.model('ProductionOrder').countDocuments();
    const year = new Date().getFullYear();
    this.numeroOrden = `OF-${year}-${String(count + 1).padStart(4, '0')}`;
  }

  // Si el estado cambia a completada, guardar la fecha
  if (this.isModified('estado') && this.estado === 'completada' && !this.fechaCompletada) {
    this.fechaCompletada = new Date();
  }

  next();
});

// Índices para búsquedas optimizadas
ProductionOrderSchema.index({ estado: 1, fechaLimite: 1 });
ProductionOrderSchema.index({ numeroOrden: 1 });
ProductionOrderSchema.index({ cliente: 1 });

export const ProductionOrder = mongoose.model<IProductionOrder>('ProductionOrder', ProductionOrderSchema);