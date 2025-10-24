import express from 'express';
import Empresa from '../models/Empresa.js';
const router = express.Router();
// GET all empresas
router.get('/', async (req, res) => {
    try {
        const empresas = await Empresa.find().sort({ nombre: 1 });
        res.json(empresas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener empresas', error });
    }
});
// GET single empresa
router.get('/:id', async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(empresa);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener empresa', error });
    }
});
// POST new empresa
router.post('/', async (req, res) => {
    try {
        const empresa = new Empresa(req.body);
        await empresa.save();
        res.status(201).json(empresa);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El nombre o RUT de la empresa ya existe' });
        }
        res.status(400).json({ message: 'Error al crear empresa', error });
    }
});
// PUT update empresa
router.put('/:id', async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json(empresa);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar empresa', error });
    }
});
// DELETE empresa
router.delete('/:id', async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndDelete(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.json({ message: 'Empresa eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar empresa', error });
    }
});
export default router;
//# sourceMappingURL=empresas.js.map