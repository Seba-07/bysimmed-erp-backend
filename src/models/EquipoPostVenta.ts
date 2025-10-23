import mongoose from 'mongoose'

const equipoPostVentaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    trim: true
  },
  numeroSerie: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  fechaEntrega: {
    type: Date,
    required: true
  },
  proximaMantencion: {
    type: Date
  },
  piezasReportadas: {
    type: String
  },
  notas: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model('EquipoPostVenta', equipoPostVentaSchema)
