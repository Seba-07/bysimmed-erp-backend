import { Router } from 'express';
import Cotizacion from '../models/Cotizacion.js';
import Cliente from '../models/Cliente.js';
import { generateCotizacionPDF } from '../services/pdfGenerator.js';
import path from 'path';
import fs from 'fs';
const router = Router();
// GET all cotizaciones
router.get('/', async (req, res) => {
    try {
        const cotizaciones = await Cotizacion.find()
            .populate('cliente', 'nombre codigoCliente')
            .sort({ createdAt: -1 });
        res.json(cotizaciones);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cotizaciones', error });
    }
});
// GET single cotizacion
router.get('/:id', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id)
            .populate('cliente', 'nombre codigoCliente');
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        res.json(cotizacion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener cotización', error });
    }
});
// GET next numero for cliente
router.get('/next-numero/:clienteId', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        // Buscar la última cotización de este cliente
        const ultimaCotizacion = await Cotizacion.findOne({ cliente: req.params.clienteId })
            .sort({ numeroSecuencial: -1 });
        const numeroSecuencial = ultimaCotizacion ? ultimaCotizacion.numeroSecuencial + 1 : 1;
        const numero = `${cliente.codigoCliente}-${String(numeroSecuencial).padStart(2, '0')}`;
        res.json({ numero, numeroSecuencial, codigoCliente: cliente.codigoCliente });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al generar número', error });
    }
});
// POST new cotizacion
router.post('/', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.body.cliente);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        // Si no viene numeroSecuencial, calcularlo
        if (!req.body.numeroSecuencial) {
            const ultimaCotizacion = await Cotizacion.findOne({ cliente: req.body.cliente })
                .sort({ numeroSecuencial: -1 });
            req.body.numeroSecuencial = ultimaCotizacion ? ultimaCotizacion.numeroSecuencial + 1 : 1;
        }
        // Generar el número completo
        if (!req.body.numero) {
            req.body.numero = `${cliente.codigoCliente}-${String(req.body.numeroSecuencial).padStart(2, '0')}`;
        }
        req.body.clienteNombre = cliente.nombre;
        const cotizacion = new Cotizacion(req.body);
        const savedCotizacion = await cotizacion.save();
        const populated = await Cotizacion.findById(savedCotizacion._id).populate('cliente', 'nombre codigoCliente');
        res.status(201).json(populated);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear cotización', error });
    }
});
// PUT update cotizacion
router.put('/:id', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        // Auto-set fechaEnvio when estado changes to 'enviada'
        if (req.body.estado === 'enviada' && cotizacion.estado !== 'enviada' && !req.body.fechaEnvio) {
            req.body.fechaEnvio = new Date();
        }
        // Auto-set fechaAceptacion when estado changes to 'aceptada'
        if (req.body.estado === 'aceptada' && cotizacion.estado !== 'aceptada' && !req.body.fechaAceptacion) {
            req.body.fechaAceptacion = new Date();
        }
        const updatedCotizacion = await Cotizacion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('cliente', 'nombre codigoCliente');
        res.json(updatedCotizacion);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al actualizar cotización', error });
    }
});
// DELETE cotizacion
router.delete('/:id', async (req, res) => {
    try {
        const deletedCotizacion = await Cotizacion.findByIdAndDelete(req.params.id);
        if (!deletedCotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        res.json({ message: 'Cotización eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar cotización', error });
    }
});
// POST generate PDF for cotizacion
router.post('/:id/generate-pdf', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id)
            .populate('cliente');
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        // Obtener información del cliente con empresa
        const cliente = cotizacion.cliente;
        // Preparar datos para el PDF
        const pdfData = {
            numero: cotizacion.numero,
            fechaSolicitud: cotizacion.fechaSolicitud,
            clienteNombre: cotizacion.clienteNombre,
            clienteData: {
                rut: cliente?.rut,
                email: cliente?.email,
                telefono: cliente?.telefono,
                direccion: cliente?.direccion,
                empresa: cliente?.empresa ? {
                    nombre: cliente.empresa.nombre,
                    rut: cliente.empresa.rut,
                    direccion: cliente.empresa.direccion
                } : undefined
            },
            productos: (cotizacion.productos || []).map(p => ({
                tipo: p.tipo,
                itemId: p.itemId.toString(),
                codigo: p.codigo,
                nombre: p.nombre,
                descripcion: p.descripcion || undefined,
                cantidad: p.cantidad,
                precioUnitario: p.precioUnitario,
                subtotal: p.subtotal
            })),
            moneda: cotizacion.moneda || 'CLP',
            tasaCambio: cotizacion.tasaCambio || undefined,
            subtotal: cotizacion.subtotal || 0,
            iva: cotizacion.iva || 0,
            monto: cotizacion.monto || 0,
            notas: cotizacion.notas || undefined,
            condicionesComerciales: cotizacion.condicionesComerciales || undefined
        };
        // Generar PDF
        const pdfPath = await generateCotizacionPDF(pdfData);
        // Guardar ruta del PDF en la cotización
        cotizacion.set('pdfPath', pdfPath);
        await cotizacion.save();
        res.json({ message: 'PDF generado correctamente', pdfPath });
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error al generar PDF', error });
    }
});
// GET download PDF
router.get('/:id/pdf', async (req, res) => {
    try {
        const cotizacion = await Cotizacion.findById(req.params.id);
        if (!cotizacion) {
            return res.status(404).json({ message: 'Cotización no encontrada' });
        }
        const pdfPath = cotizacion.pdfPath;
        if (!pdfPath) {
            return res.status(404).json({ message: 'Esta cotización no tiene PDF generado' });
        }
        const fullPath = path.join(process.cwd(), pdfPath);
        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ message: 'Archivo PDF no encontrado' });
        }
        res.sendFile(fullPath);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al descargar PDF', error });
    }
});
export default router;
//# sourceMappingURL=cotizaciones.js.map