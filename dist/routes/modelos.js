import express from 'express';
import Modelo from '../models/Modelo.js';
const router = express.Router();
// GET next codigo
router.get('/next-codigo', async (req, res) => {
    try {
        const lastModelo = await Modelo.findOne().sort({ codigo: -1 });
        let nextNum = 1;
        if (lastModelo && lastModelo.codigo) {
            const match = lastModelo.codigo.match(/MOD(\d+)/);
            if (match) {
                nextNum = parseInt(match[1]) + 1;
            }
        }
        const codigo = `MOD${String(nextNum).padStart(4, '0')}`;
        res.json({ codigo });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al generar código', error });
    }
});
// GET all models
router.get('/', async (req, res) => {
    try {
        const modelos = await Modelo.find().sort({ nombre: 1 });
        res.json(modelos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener modelos', error });
    }
});
// GET single model
router.get('/:id', async (req, res) => {
    try {
        const modelo = await Modelo.findById(req.params.id);
        if (!modelo) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json(modelo);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener modelo', error });
    }
});
// POST new model
router.post('/', async (req, res) => {
    try {
        const modelo = new Modelo(req.body);
        await modelo.save();
        res.status(201).json(modelo);
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El código ya existe' });
        }
        res.status(400).json({ message: 'Error al crear modelo', error });
    }
});
// PUT update model
router.put('/:id', async (req, res) => {
    try {
        const modelo = await Modelo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!modelo) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json(modelo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar modelo', error });
    }
});
// DELETE model
router.delete('/:id', async (req, res) => {
    try {
        const modelo = await Modelo.findByIdAndDelete(req.params.id);
        if (!modelo) {
            return res.status(404).json({ message: 'Modelo no encontrado' });
        }
        res.json({ message: 'Modelo eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar modelo', error });
    }
});
export default router;
//# sourceMappingURL=modelos.js.map