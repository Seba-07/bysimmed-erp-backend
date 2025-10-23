import mongoose from 'mongoose';
const cotizacionSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        trim: true
    },
    numeroRecotizacion: {
        type: Number,
        default: 0
    },
    cliente: {
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
    monto: {
        type: Number
    },
    notas: {
        type: String
    }
}, {
    timestamps: true
});
export default mongoose.model('Cotizacion', cotizacionSchema);
//# sourceMappingURL=Cotizacion.js.map