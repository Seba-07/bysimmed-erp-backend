import mongoose from 'mongoose'

const cuentaPorCobrarSchema = new mongoose.Schema({
  numeroFactura: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  monto: {
    type: Number,
    required: true
  },
  fechaEmision: {
    type: Date,
    required: true,
    default: Date.now
  },
  fechaVencimiento: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'vencido', 'parcial'],
    default: 'pendiente'
  },
  montoPagado: {
    type: Number,
    default: 0
  },
  saldoPendiente: {
    type: Number
  },
  diasVencido: {
    type: Number,
    default: 0
  },
  notas: {
    type: String
  }
}, {
  timestamps: true
})

// Calcular saldo pendiente y días vencidos
cuentaPorCobrarSchema.pre('save', function(next) {
  this.saldoPendiente = this.monto - this.montoPagado

  if (this.estado === 'vencido') {
    const hoy = new Date()
    const vencimiento = new Date(this.fechaVencimiento)
    this.diasVencido = Math.floor((hoy.getTime() - vencimiento.getTime()) / (1000 * 60 * 60 * 24))
  }

  next()
})

export default mongoose.model('CuentaPorCobrar', cuentaPorCobrarSchema)
