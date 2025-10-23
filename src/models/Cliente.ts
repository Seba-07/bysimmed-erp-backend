import mongoose from 'mongoose'

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  rut: {
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
  },
  direccion: {
    type: String,
    trim: true
  },
  codigoCliente: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 4,
    uppercase: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  notas: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Cliente', clienteSchema)
