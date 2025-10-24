import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
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
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    nombre: string;
    activo: boolean;
    categoria: "materiales" | "componentes" | "servicios" | "otros";
    notas?: string | null | undefined;
    rut?: string | null | undefined;
    email?: string | null | undefined;
    telefono?: string | null | undefined;
    direccion?: string | null | undefined;
    contacto?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Proveedor.d.ts.map