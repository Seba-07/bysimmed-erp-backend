import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
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
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
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
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
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
    unidadCompra: string;
    unidadFabricacion: "unidad" | "kg" | "g" | "litro" | "ml" | "metro" | "cm" | "mm";
    factorConversion: number;
    stockMinimo: number;
    precioCompra: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Material.d.ts.map