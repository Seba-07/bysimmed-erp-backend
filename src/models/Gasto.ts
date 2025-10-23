import mongoose from 'mongoose'

const gastoSchema = new mongoose.Schema({
  numeroGasto: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['operacional', 'sueldo', 'servicios', 'impuestos', 'otros'],
    required: true
  },
  concepto: {
    type: String,
    required: true,
    trim: true
  },
  monto: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  metodoPago: {
    type: String,
    enum: ['efectivo', 'transferencia', 'cheque', 'tarjeta', 'otro'],
    default: 'transferencia'
  },
  proveedor: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'vencido'],
    default: 'pendiente'
  },
  fechaPago: {
    type: Date
  },
  cuentaBancaria: {
    type: String
  },
  comprobante: {
    type: String
  },
  notas: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Gasto', gastoSchema)
