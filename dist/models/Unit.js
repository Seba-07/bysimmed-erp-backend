import mongoose, { Schema } from 'mongoose';
const UnitSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        unique: true
    },
    abreviatura: {
        type: String,
        required: [true, 'La abreviatura es requerida'],
        trim: true,
        unique: true
    },
    tipo: {
        type: String,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});
export const Unit = mongoose.model('Unit', UnitSchema);
//# sourceMappingURL=Unit.js.map