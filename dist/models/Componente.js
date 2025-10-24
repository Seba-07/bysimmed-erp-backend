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
    descripcion: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    stockMinimo: {
        type: Number,
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