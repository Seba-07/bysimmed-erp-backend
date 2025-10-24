import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

interface ProductoCotizacion {
  tipo: 'modelo' | 'componente'
  itemId: string
  codigo: string
  nombre: string
  descripcion?: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

interface CotizacionData {
  numero: string
  fechaSolicitud: Date
  clienteNombre: string
  clienteData?: {
    rut?: string
    email?: string
    telefono?: string
    direccion?: string
    empresa?: {
      nombre: string
      rut?: string
      direccion?: string
    }
  }
  productos: ProductoCotizacion[]
  productosConPDF?: Array<{producto: ProductoCotizacion, pdfPath?: string}>
  moneda: 'CLP' | 'USD'
  tasaCambio?: number
  subtotal: number
  iva: number
  monto: number
  notas?: string
  condicionesComerciales?: string
}

export async function generateCotizacionPDF(cotizacion: CotizacionData): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Crear carpeta si no existe
      const cotizacionesDir = path.join(process.cwd(), 'uploads', 'cotizaciones')
      if (!fs.existsSync(cotizacionesDir)) {
        fs.mkdirSync(cotizacionesDir, { recursive: true })
      }

      // Nombre del archivo
      const filename = `cotizacion-${cotizacion.numero.replace(/\//g, '-')}-${Date.now()}.pdf`
      const filepath = path.join(cotizacionesDir, filename)

      // Crear documento
      const doc = new PDFDocument({
        size: 'letter',
        margins: { top: 60, bottom: 60, left: 60, right: 60 }
      })

      // Pipe a archivo
      const stream = fs.createWriteStream(filepath)
      doc.pipe(stream)

      // ========== HEADER SECTION ==========
      // Header background (azul oscuro)
      doc.rect(0, 0, 612, 120).fillAndStroke('#1e40af', '#1e40af')

      // Logo/Empresa
      doc.fontSize(32).font('Helvetica-Bold').fillColor('#ffffff').text('bySIMMED', 60, 30)
      doc.fontSize(11).font('Helvetica').fillColor('#e0e7ff').text('Soluciones Médicas Integrales', 60, 68)

      // COTIZACIÓN title (lado derecho del header)
      doc.fontSize(24).font('Helvetica-Bold').fillColor('#ffffff').text('COTIZACIÓN', 350, 45, { align: 'right', width: 200 })

      // Reset y bajar posición
      doc.y = 140

      // ========== INFO BOXES SECTION ==========
      // Box 1: Información de Cotización (izquierda)
      let currentY = 150
      doc.rect(60, currentY, 230, 90).fillAndStroke('#f3f4f6', '#d1d5db')

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#374151').text('N° COTIZACIÓN', 70, currentY + 10)
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af').text(cotizacion.numero, 70, currentY + 28)

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#374151').text('FECHA', 70, currentY + 55)
      doc.fontSize(11).font('Helvetica').fillColor('#111827').text(
        new Date(cotizacion.fechaSolicitud).toLocaleDateString('es-CL', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        70,
        currentY + 70
      )

      // Box 2: Información de Cliente (derecha)
      doc.rect(310, currentY, 242, 90).fillAndStroke('#f3f4f6', '#d1d5db')

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#374151').text('CLIENTE', 320, currentY + 10)
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#111827').text(cotizacion.clienteNombre, 320, currentY + 28, { width: 220 })

      if (cotizacion.clienteData?.empresa) {
        doc.fontSize(9).font('Helvetica').fillColor('#6b7280').text(cotizacion.clienteData.empresa.nombre, 320, currentY + 48, { width: 220 })
      }

      if (cotizacion.clienteData?.rut) {
        doc.fontSize(9).font('Helvetica').fillColor('#6b7280').text(`RUT: ${cotizacion.clienteData.rut}`, 320, currentY + 68)
      }

      doc.y = currentY + 110

      // ========== TABLA DE PRODUCTOS ==========
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#111827').text('Detalle de Productos', 60, doc.y)
      doc.moveDown(1)

      // Encabezados de tabla con fondo
      const tableTop = doc.y
      doc.rect(60, tableTop, 492, 25).fillAndStroke('#1e40af', '#1e40af')

      const colPositions = {
        item: 65,
        descripcion: 110,
        cantidad: 360,
        precioUnit: 420,
        subtotal: 490
      }

      doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff')
      doc.text('Item', colPositions.item, tableTop + 8)
      doc.text('Descripción', colPositions.descripcion, tableTop + 8)
      doc.text('Cant.', colPositions.cantidad, tableTop + 8)
      doc.text('Precio Unit.', colPositions.precioUnit, tableTop + 8)
      doc.text('Subtotal', colPositions.subtotal, tableTop + 8)

      let yPosition = tableTop + 35
      const monedaSimbolo = cotizacion.moneda === 'USD' ? 'USD' : '$'

      // Productos con filas alternadas
      doc.font('Helvetica').fontSize(9).fillColor('#111827')
      cotizacion.productos.forEach((producto, index) => {
        // Verificar si necesitamos nueva página
        if (yPosition > 680) {
          doc.addPage()
          yPosition = 60
        }

        // Fila alternada
        if (index % 2 === 0) {
          doc.rect(60, yPosition - 5, 492, 28).fillAndStroke('#f9fafb', '#f9fafb')
        }

        doc.fillColor('#374151').text(`${index + 1}`, colPositions.item, yPosition, { width: 30 })
        doc.fillColor('#111827').text(producto.nombre, colPositions.descripcion, yPosition, { width: 240 })
        if (producto.descripcion) {
          doc.fontSize(8).fillColor('#6b7280').text(producto.descripcion, colPositions.descripcion, yPosition + 12, { width: 240 })
          doc.fontSize(9).fillColor('#111827')
        }
        doc.text(producto.cantidad.toString(), colPositions.cantidad, yPosition, { width: 40, align: 'center' })
        doc.text(`${monedaSimbolo} ${producto.precioUnitario.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`, colPositions.precioUnit, yPosition, { width: 60, align: 'right' })
        doc.text(`${monedaSimbolo} ${producto.subtotal.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`, colPositions.subtotal, yPosition, { width: 60, align: 'right' })

        yPosition += 28
      })

      // ========== TOTALES SECTION ==========
      yPosition += 10

      // Box de totales
      const totalBoxY = yPosition
      doc.rect(350, totalBoxY, 202, cotizacion.moneda === 'CLP' ? 100 : 80).fillAndStroke('#f3f4f6', '#d1d5db')

      // Subtotal
      doc.fontSize(10).font('Helvetica').fillColor('#374151')
      doc.text('Subtotal:', 360, totalBoxY + 15)
      doc.text(`${monedaSimbolo} ${cotizacion.subtotal.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`, 360, totalBoxY + 15, { width: 182, align: 'right' })

      // IVA (solo para CLP)
      if (cotizacion.moneda === 'CLP') {
        doc.text('IVA (19%):', 360, totalBoxY + 38)
        doc.text(`$ ${cotizacion.iva.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`, 360, totalBoxY + 38, { width: 182, align: 'right' })
      }

      // Línea divisoria
      const lineY = cotizacion.moneda === 'CLP' ? totalBoxY + 58 : totalBoxY + 38
      doc.moveTo(360, lineY).lineTo(542, lineY).strokeColor('#9ca3af').stroke()

      // Total (destacado)
      const totalY = cotizacion.moneda === 'CLP' ? totalBoxY + 68 : totalBoxY + 48
      doc.fontSize(14).font('Helvetica-Bold').fillColor('#1e40af')
      doc.text('TOTAL:', 360, totalY)
      doc.text(`${monedaSimbolo} ${cotizacion.monto.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`, 360, totalY, { width: 182, align: 'right' })

      yPosition = totalBoxY + (cotizacion.moneda === 'CLP' ? 110 : 90)

      // Tasa de cambio para USD
      if (cotizacion.moneda === 'USD' && cotizacion.tasaCambio) {
        doc.fontSize(8).fillColor('#6b7280').font('Helvetica')
        doc.text(`Tasa de cambio: ${cotizacion.tasaCambio.toLocaleString('es-CL')} CLP/USD`, 360, yPosition)
        yPosition += 15
      }

      doc.fillColor('#111827')

      // ========== CONDICIONES COMERCIALES ==========
      if (cotizacion.condicionesComerciales) {
        yPosition += 25
        if (yPosition > 620) {
          doc.addPage()
          yPosition = 60
        }

        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1e40af').text('Condiciones Comerciales', 60, yPosition)
        yPosition += 15
        doc.fontSize(9).font('Helvetica').fillColor('#374151').text(cotizacion.condicionesComerciales, 60, yPosition, {
          width: 492,
          align: 'justify',
          lineGap: 3
        })
        yPosition = doc.y + 15
      }

      // ========== NOTAS ==========
      if (cotizacion.notas) {
        yPosition += 10
        if (yPosition > 660) {
          doc.addPage()
          yPosition = 60
        }

        doc.fontSize(11).font('Helvetica-Bold').fillColor('#374151').text('Notas Adicionales:', 60, yPosition)
        yPosition += 12
        doc.fontSize(9).font('Helvetica').fillColor('#6b7280').text(cotizacion.notas, 60, yPosition, {
          width: 492,
          align: 'justify',
          lineGap: 3
        })
      }

      // ========== FOOTER ==========
      const pageCount = doc.bufferedPageRange()
      for (let i = 0; i < pageCount.count; i++) {
        doc.switchToPage(i)

        // Línea superior del footer
        const footerY = doc.page.height - 50
        doc.moveTo(60, footerY - 10).lineTo(552, footerY - 10).strokeColor('#e5e7eb').stroke()

        // Información del footer
        doc.fontSize(8).fillColor('#9ca3af')
        doc.text('bySIMMED - Soluciones Médicas Integrales', 60, footerY, { width: 250, align: 'left' })
        doc.text(`Página ${i + 1} de ${pageCount.count}`, 60, footerY, { width: 492, align: 'right' })
      }

      // Finalizar PDF
      doc.end()

      stream.on('finish', () => {
        resolve(path.relative(process.cwd(), filepath))
      })

      stream.on('error', (error) => {
        reject(error)
      })

    } catch (error) {
      reject(error)
    }
  })
}
