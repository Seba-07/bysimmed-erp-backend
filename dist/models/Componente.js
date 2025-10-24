import mongoose from 'mongoose';
const componenteSchema = new mongoose.Schema({
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
    materiales: [{
            materialId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Material',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 0,
                comment: 'Cantidad en unidades de fabricación del material'
            }
        }],
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
});
export default mongoose.model('Componente', componenteSchema);
//# sourceMappingURL=Componente.js.map