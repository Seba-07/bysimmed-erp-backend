import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  unidadCompra: {
    type: String,
    required: true,
    trim: true
  },
  unidadFabricacion: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'litro', 'ml', 'metro', 'cm', 'mm', 'unidad']
  },
  factorConversion: {
    type: Number,
    required: true,
    min: 0,
    comment: 'Cantidad de unidades de fabricación en una unidad de compra'
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  stockMinimo: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  precioCompra: {
    type: Number,
    required: true,
    min: 0,
    comment: 'Precio por unidad de compra'
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Material', materialSchema)
