import mongoose from 'mongoose';
const empresaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rut: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    razonSocial: {
        type: String,
        trim: true
    },
    giro: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        trim: true
    },
    ciudad: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    sitioWeb: {
        type: String,
        trim: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    notas: {
        type: String
    }
}, {
    timestamps: true
});
export default mongoose.model('Empresa', empresaSchema);
//# sourceMappingURL=Empresa.js.map