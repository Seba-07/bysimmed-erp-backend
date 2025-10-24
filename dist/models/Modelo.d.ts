import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
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
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    descripcion?: string | null | undefined;
    imagen?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Modelo.d.ts.map