import mongoose from 'mongoose';
const ordenCompraSchema = new mongoose.Schema({
    numeroOC: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    numeroCotizacion: {
        type: String,
        required: true,
        trim: true
    },
    fechaEmision: {
        type: Date,
        required: true
    },
    fechaPago: {
        type: Date
    },
    monto: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'pagada'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});
export default mongoose.model('OrdenCompra', ordenCompraSchema);
//# sourceMappingURL=OrdenCompra.js.map