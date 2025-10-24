import mongoose from 'mongoose'

const cotizacionSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    trim: true
  },
  numeroSecuencial: {
    type: Number,
    required: true
  },
  numeroRecotizacion: {
    type: Number,
    default: 0
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  clienteNombre: {
    type: String,
    required: true,
    trim: true
  },
  fechaSolicitud: {
    type: Date,
    required: true
  },
  fechaEnvio: {
    type: Date
  },
  fechaAceptacion: {
    type: Date
  },
  estado: {
    type: String,
    enum: ['solicitada', 'enviada', 'aceptada', 'rechazada'],
    default: 'solicitada'
  },
  productos: [{
    modeloId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true
    },
    nombreModelo: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  moneda: {
    type: String,
    enum: ['CLP', 'USD'],
    default: 'CLP'
  },
  monto: {
    type: Number
  },
  notas: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Cotizacion', cotizacionSchema)
