import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
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
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cliente: string;
    estado: "pendiente" | "pagado" | "vencido" | "parcial";
    monto: number;
    fechaEmision: NativeDate;
    numeroFactura: string;
    fechaVencimiento: NativeDate;
    montoPagado: number;
    diasVencido: number;
    notas?: string | null | undefined;
    saldoPendiente?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=CuentaPorCobrar.d.ts.map