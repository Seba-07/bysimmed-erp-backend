interface ProductoCotizacion {
    tipo: 'modelo' | 'componente';
    itemId: string;
    codigo: string;
    nombre: string;
    descripcion?: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}
interface CotizacionData {
    numero: string;
    fechaSolicitud: Date;
    clienteNombre: string;
    clienteData?: {
        rut?: string;
        email?: string;
        telefono?: string;
        direccion?: string;
        empresa?: {
            nombre: string;
            rut?: string;
            direccion?: string;
        };
    };
    productos: ProductoCotizacion[];
    productosConPDF?: Array<{
        producto: ProductoCotizacion;
        pdfPath?: string;
    }>;
    moneda: 'CLP' | 'USD';
    tasaCambio?: number;
    subtotal: number;
    iva: number;
    monto: number;
    notas?: string;
    condicionesComerciales?: string;
}
export declare function generateCotizacionPDF(cotizacion: CotizacionData): Promise<string>;
export {};
//# sourceMappingURL=pdfGenerator.d.ts.map