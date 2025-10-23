import mongoose from 'mongoose';
const itemCompraSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    unidad: { type: String, required: true },
    precioUnitario: { type: Number, required: true }
}, { _id: false });
const solicitudCompraSchema = new mongoose.Schema({
    numeroSolicitud: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    proveedor: {
        type: String,
        required: true,
        trim: true
    },
    fechaSolicitud: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaEntregaEstimada: {
        type: Date
    },
    items: [itemCompraSchema],
    montoTotal: {
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: String,
        enum: ['pendiente', 'aprobada', 'rechazada', 'recibida', 'cancelada'],
        default: 'pendiente'
    },
    solicitadoPor: {
        type: String,
        required: true
    },
    aprobadoPor: {
        type: String
    },
    fechaAprobacion: {
        type: Date
    },
    notas: {
        type: String
    }
}, {
    timestamps: true
});
// Calcular monto total antes de guardar
solicitudCompraSchema.pre('save', function (next) {
    this.montoTotal = this.items.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    next();
});
export default mongoose.model('SolicitudCompra', solicitudCompraSchema);
//# sourceMappingURL=SolicitudCompra.js.map