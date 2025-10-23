import mongoose from 'mongoose'

const clientePostVentaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  contacto: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.model('ClientePostVenta', clientePostVentaSchema)
