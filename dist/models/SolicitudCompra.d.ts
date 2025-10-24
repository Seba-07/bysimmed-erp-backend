import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
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
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaSolicitud: NativeDate;
    estado: "rechazada" | "pendiente" | "aprobada" | "recibida" | "cancelada";
    numeroSolicitud: string;
    proveedor: string;
    items: mongoose.Types.DocumentArray<{
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }> & {
        cantidad: number;
        precioUnitario: number;
        producto: string;
        unidad: string;
    }>;
    montoTotal: number;
    solicitadoPor: string;
    notas?: string | null | undefined;
    fechaEntregaEstimada?: NativeDate | null | undefined;
    aprobadoPor?: string | null | undefined;
    fechaAprobacion?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=SolicitudCompra.d.ts.map