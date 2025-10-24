import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
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
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    estado: "pendiente" | "pagado" | "vencido";
    tipo: "servicios" | "otros" | "operacional" | "sueldo" | "impuestos";
    monto: number;
    numeroGasto: string;
    concepto: string;
    fecha: NativeDate;
    metodoPago: "efectivo" | "transferencia" | "cheque" | "tarjeta" | "otro";
    notas?: string | null | undefined;
    fechaPago?: NativeDate | null | undefined;
    categoria?: string | null | undefined;
    proveedor?: string | null | undefined;
    cuentaBancaria?: string | null | undefined;
    comprobante?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Gasto.d.ts.map