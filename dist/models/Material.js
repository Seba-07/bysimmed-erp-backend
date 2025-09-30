import mongoose, { Schema } from 'mongoose';
const MaterialSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    imagen: {
        type: String,
        default: null
    },
    unidad: {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: [true, 'La unidad es requerida']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es requerido'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    precioUnitario: {
        type: Number,
        required: [true, 'El precio unitario es requerido'],
        min: [0, 'El precio no puede ser negativo'],
        default: 0
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    }
});
// Middleware para actualizar fechaActualizacion
MaterialSchema.pre('save', function (next) {
    this.fechaActualizacion = new Date();
    next();
});
export const Material = mongoose.model('Material', MaterialSchema);
//# sourceMappingURL=Material.js.map