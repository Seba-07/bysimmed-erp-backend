import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
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
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fechaEntrega: NativeDate;
    cliente: string;
    modelo: string;
    numeroSerie: string;
    notas?: string | null | undefined;
    proximaMantencion?: NativeDate | null | undefined;
    piezasReportadas?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=EquipoPostVenta.d.ts.map