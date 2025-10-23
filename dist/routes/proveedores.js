import { Router } from 'express';
import Proveedor from '../models/Proveedor.js';
const router = Router();
router.get('/', async (req, res) => {
    try {
        const proveedores = await Proveedor.find().sort({ createdAt: -1 });
        res.json(proveedores);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedores', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json(proveedor);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener proveedor', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body);
        const savedProveedor = await proveedor.save();
        res.status(201).json(savedProveedor);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear proveedor', error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedProveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json(updatedProveedor);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar proveedor', error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedProveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!deletedProveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar proveedor', error });
    }
});
export default router;
//# sourceMappingURL=proveedores.js.map