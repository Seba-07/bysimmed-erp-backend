import { Router } from 'express';
import CuentaBancaria from '../models/CuentaBancaria.js';
import CuentaPorCobrar from '../models/CuentaPorCobrar.js';
const router = Router();
// ===== CUENTAS BANCARIAS =====
router.get('/cuentas-bancarias', async (req, res) => {
    try {
        const cuentas = await CuentaBancaria.find().sort({ createdAt: -1 });
        res.json(cuentas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cuentas bancarias', error });
    }
});
router.post('/cuentas-bancarias', async (req, res) => {
    try {
        const cuenta = new CuentaBancaria(req.body);
        const savedCuenta = await cuenta.save();
        res.status(201).json(savedCuenta);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear cuenta bancaria', error });
    }
});
router.put('/cuentas-bancarias/:id', async (req, res) => {
    try {
        const updatedCuenta = await CuentaBancaria.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCuenta) {
            return res.status(404).json({ message: 'Cuenta bancaria no encontrada' });
        }
        res.json(updatedCuenta);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar cuenta bancaria', error });
    }
});
router.delete('/cuentas-bancarias/:id', async (req, res) => {
    try {
        const deletedCuenta = await CuentaBancaria.findByIdAndDelete(req.params.id);
        if (!deletedCuenta) {
            return res.status(404).json({ message: 'Cuenta bancaria no encontrada' });
        }
        res.json({ message: 'Cuenta bancaria eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar cuenta bancaria', error });
    }
});
// ===== CUENTAS POR COBRAR =====
router.get('/cuentas-por-cobrar', async (req, res) => {
    try {
        const cuentas = await CuentaPorCobrar.find().sort({ fechaEmision: -1 });
        res.json(cuentas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cuentas por cobrar', error });
    }
});
router.post('/cuentas-por-cobrar', async (req, res) => {
    try {
        const cuenta = new CuentaPorCobrar(req.body);
        const savedCuenta = await cuenta.save();
        res.status(201).json(savedCuenta);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear cuenta por cobrar', error });
    }
});
router.put('/cuentas-por-cobrar/:id', async (req, res) => {
    try {
        const updatedCuenta = await CuentaPorCobrar.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCuenta) {
            return res.status(404).json({ message: 'Cuenta por cobrar no encontrada' });
        }
        res.json(updatedCuenta);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar cuenta por cobrar', error });
    }
});
router.delete('/cuentas-por-cobrar/:id', async (req, res) => {
    try {
        const deletedCuenta = await CuentaPorCobrar.findByIdAndDelete(req.params.id);
        if (!deletedCuenta) {
            return res.status(404).json({ message: 'Cuenta por cobrar no encontrada' });
        }
        res.json({ message: 'Cuenta por cobrar eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar cuenta por cobrar', error });
    }
});
export default router;
//# sourceMappingURL=finanzas.js.map