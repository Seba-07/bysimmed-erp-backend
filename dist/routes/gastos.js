import { Router } from 'express';
import Gasto from '../models/Gasto.js';
const router = Router();
router.get('/', async (req, res) => {
    try {
        const gastos = await Gasto.find().sort({ fecha: -1 });
        res.json(gastos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener gastos', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const gasto = await Gasto.findById(req.params.id);
        if (!gasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json(gasto);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener gasto', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const gasto = new Gasto(req.body);
        const savedGasto = await gasto.save();
        res.status(201).json(savedGasto);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear gasto', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedGasto = await Gasto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json(updatedGasto);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar gasto', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedGasto = await Gasto.findByIdAndDelete(req.params.id);
        if (!deletedGasto) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.json({ message: 'Gasto eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar gasto', error });
    }
});
export default router;
//# sourceMappingURL=gastos.js.map