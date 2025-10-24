import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
export async function generateCotizacionPDF(cotizacion) {
    return new Promise((resolve, reject) => {
        try {
            // Crear carpeta si no existe
            const cotizacionesDir = path.join(process.cwd(), 'uploads', 'cotizaciones');
            if (!fs.existsSync(cotizacionesDir)) {
                fs.mkdirSync(cotizacionesDir, { recursive: true });
            }
            // Nombre del archivo
            const filename = `cotizacion-${cotizacion.numero.replace(/\//g, '-')}-${Date.now()}.pdf`;
            const filepath = path.join(cotizacionesDir, filename);
            // Crear documento
            const doc = new PDFDocument({
                size: 'letter',
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });
            // Pipe a archivo
            const stream = fs.createWriteStream(filepath);
            doc.pipe(stream);
            // HEADER - Empresa
            doc.fontSize(24).font('Helvetica-Bold').text('bySIMMED', { align: 'left' });
            doc.fontSize(10).font('Helvetica').text('Soluciones Médicas Integrales', { align: 'left' });
            doc.moveDown(0.5);
            // Línea divisoria
            doc.moveTo(50, doc.y).lineTo(562, doc.y).stroke();
            doc.moveDown();
            // TÍTULO
            doc.fontSize(20).font('Helvetica-Bold').fillColor('#2563eb').text('COTIZACIÓN', { align: 'center' });
            doc.moveDown(0.5);
            // Información de la cotización
            const startY = doc.y;
            doc.fontSize(10).fillColor('black').font('Helvetica-Bold');
            doc.text(`N° Cotización:`, 50, startY);
            doc.font('Helvetica').text(cotizacion.numero, 150, startY);
            doc.font('Helvetica-Bold').text(`Fecha:`, 50, startY + 15);
            doc.font('Helvetica').text(new Date(cotizacion.fechaSolicitud).toLocaleDateString('es-CL'), 150, startY + 15);
            // Información del cliente (lado derecho)
            doc.font('Helvetica-Bold').text('Cliente:', 320, startY);
            doc.font('Helvetica').text(cotizacion.clienteNombre, 320, startY + 15, { width: 230 });
            if (cotizacion.clienteData?.empresa) {
                doc.font('Helvetica-Bold').text('Empresa:', 320, startY + 40);
                doc.font('Helvetica').text(cotizacion.clienteData.empresa.nombre, 320, startY + 55, { width: 230 });
            }
            if (cotizacion.clienteData?.rut) {
                doc.font('Helvetica-Bold').text('RUT:', 320, startY + 80);
                doc.font('Helvetica').text(cotizacion.clienteData.rut, 320, startY + 95);
            }
            doc.moveDown(6);
            // Línea divisoria
            doc.moveTo(50, doc.y).lineTo(562, doc.y).stroke();
            doc.moveDown();
            // TABLA DE PRODUCTOS
            doc.fontSize(12).font('Helvetica-Bold').text('Productos Cotizados', 50, doc.y);
            doc.moveDown(0.5);
            // Encabezados de tabla
            const tableTop = doc.y;
            const colPositions = {
                codigo: 50,
                descripcion: 120,
                cantidad: 350,
                precioUnit: 410,
                subtotal: 490
            };
            doc.fontSize(9).font('Helvetica-Bold');
            doc.text('Código', colPositions.codigo, tableTop);
            doc.text('Descripción', colPositions.descripcion, tableTop);
            doc.text('Cant.', colPositions.cantidad, tableTop);
            doc.text('Precio Unit.', colPositions.precioUnit, tableTop);
            doc.text('Subtotal', colPositions.subtotal, tableTop);
            // Línea debajo de encabezados
            doc.moveTo(50, tableTop + 15).lineTo(562, tableTop + 15).stroke();
            let yPosition = tableTop + 25;
            const monedaSimbolo = cotizacion.moneda === 'USD' ? 'USD' : '$';
            // Productos
            doc.font('Helvetica').fontSize(9);
            cotizacion.productos.forEach((producto, index) => {
                // Verificar si necesitamos nueva página
                if (yPosition > 700) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.text(producto.codigo, colPositions.codigo, yPosition, { width: 60 });
                doc.text(producto.nombre, colPositions.descripcion, yPosition, { width: 220 });
                doc.text(producto.cantidad.toString(), colPositions.cantidad, yPosition);
                doc.text(`${monedaSimbolo} ${producto.precioUnitario.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colPositions.precioUnit, yPosition, { width: 70, align: 'right' });
                doc.text(`${monedaSimbolo} ${producto.subtotal.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, colPositions.subtotal, yPosition, { width: 70, align: 'right' });
                yPosition += 25;
            });
            // Línea antes de totales
            doc.moveTo(50, yPosition).lineTo(562, yPosition).stroke();
            yPosition += 15;
            // TOTALES
            doc.font('Helvetica-Bold').fontSize(10);
            // Subtotal
            doc.text('Subtotal:', 400, yPosition);
            doc.text(`${monedaSimbolo} ${cotizacion.subtotal.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 490, yPosition, { width: 70, align: 'right' });
            yPosition += 20;
            // IVA (solo para CLP)
            if (cotizacion.moneda === 'CLP') {
                doc.text('IVA (19%):', 400, yPosition);
                doc.text(`$ ${cotizacion.iva.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 490, yPosition, { width: 70, align: 'right' });
                yPosition += 20;
            }
            // Total
            doc.fontSize(12).fillColor('#2563eb');
            doc.text('TOTAL:', 400, yPosition);
            doc.text(`${monedaSimbolo} ${cotizacion.monto.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 490, yPosition, { width: 70, align: 'right' });
            yPosition += 25;
            // Tasa de cambio para USD
            if (cotizacion.moneda === 'USD' && cotizacion.tasaCambio) {
                doc.fontSize(8).fillColor('gray').font('Helvetica');
                doc.text(`Tasa de cambio: $ ${cotizacion.tasaCambio.toLocaleString('es-CL')} CLP/USD`, 400, yPosition);
                yPosition += 15;
            }
            doc.fillColor('black');
            // CONDICIONES COMERCIALES
            if (cotizacion.condicionesComerciales) {
                yPosition += 20;
                if (yPosition > 650) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(12).font('Helvetica-Bold').text('Condiciones Comerciales', 50, yPosition);
                yPosition += 15;
                doc.fontSize(9).font('Helvetica').text(cotizacion.condicionesComerciales, 50, yPosition, {
                    width: 512,
                    align: 'justify'
                });
                yPosition = doc.y + 15;
            }
            // NOTAS
            if (cotizacion.notas) {
                yPosition += 10;
                if (yPosition > 680) {
                    doc.addPage();
                    yPosition = 50;
                }
                doc.fontSize(10).font('Helvetica-Bold').text('Notas:', 50, yPosition);
                yPosition += 12;
                doc.fontSize(9).font('Helvetica').text(cotizacion.notas, 50, yPosition, {
                    width: 512,
                    align: 'justify'
                });
            }
            // FOOTER
            const pageCount = doc.bufferedPageRange();
            for (let i = 0; i < pageCount.count; i++) {
                doc.switchToPage(i);
                doc.fontSize(8).fillColor('gray');
                doc.text(`Página ${i + 1} de ${pageCount.count}`, 50, doc.page.height - 50, { align: 'center', width: doc.page.width - 100 });
            }
            // Finalizar PDF
            doc.end();
            stream.on('finish', () => {
                resolve(path.relative(process.cwd(), filepath));
            });
            stream.on('error', (error) => {
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
//# sourceMappingURL=pdfGenerator.js.map