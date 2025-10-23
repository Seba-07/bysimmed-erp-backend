import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
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
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "solicitada" | "enviada" | "aceptada" | "rechazada";
    fechaSolicitud: NativeDate;
    cliente: mongoose.Types.ObjectId;
    numero: string;
    numeroSecuencial: number;
    numeroRecotizacion: number;
    clienteNombre: string;
    notas?: string | null | undefined;
    fechaEnvio?: NativeDate | null | undefined;
    fechaAceptacion?: NativeDate | null | undefined;
    monto?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Cotizacion.d.ts.map