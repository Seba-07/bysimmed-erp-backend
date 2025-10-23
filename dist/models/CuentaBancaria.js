import mongoose from 'mongoose';
const cuentaBancariaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    banco: {
        type: String,
        required: true,
        trim: true
    },
    numeroCuenta: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tipoCuenta: {
        type: String,
        enum: ['corriente', 'ahorro', 'vista'],
        default: 'corriente'
    },
    saldo: {
        type: Number,
        default: 0
    },
    moneda: {
        type: String,
        default: 'CLP'
    },
    activa: {
        type: Boolean,
        default: true
    },
    notas: {
        type: String
    }
}, {
    timestamps: true
});
export default mongoose.model('CuentaBancaria', cuentaBancariaSchema);
//# sourceMappingURL=CuentaBancaria.js.map