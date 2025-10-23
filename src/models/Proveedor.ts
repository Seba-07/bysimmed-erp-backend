import mongoose from 'mongoose'

const proveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  rut: {
    type: String,
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
  },
  direccion: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    enum: ['materiales', 'componentes', 'servicios', 'otros'],
    default: 'materiales'
  },
  notas: {
    type: String
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Proveedor', proveedorSchema)
