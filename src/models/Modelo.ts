import mongoose from 'mongoose'

const modeloSchema = new mongoose.Schema({
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
  componentes: [{
    componenteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Componente',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  imagen: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  precioVenta: {
    type: Number,
    required: true,
    min: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Modelo', modeloSchema)
