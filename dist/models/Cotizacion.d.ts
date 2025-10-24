import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    cliente: mongoose.Types.ObjectId;
    clienteNombre: string;
    fechaSolicitud: NativeDate;
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    productos: mongoose.Types.DocumentArray<{
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }> & {
        tipo: "modelo" | "componente";
        itemId: mongoose.Types.ObjectId;
        codigo: string;
        nombre: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
        descripcion?: string | null | undefined;
    }>;
    moneda: "CLP" | "USD";
    iva: number;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    subtotal?: number | null | undefined;
    tasaCambio?: number | null | undefined;
    monto?: number | null | undefined;
    notas?: string | null | undefined;
    condicionesComerciales?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Cotizacion.d.ts.map