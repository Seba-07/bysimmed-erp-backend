import mongoose, { Document } from 'mongoose';
export interface IPresentacion {
    nombre: string;
    factorConversion: number;
    precioCompra?: number;
}
export interface IMaterial extends Document {
    nombre: string;
    descripcion?: string;
    imagen?: string;
    categoria: 'Accesorios' | 'Aditivos' | 'Filamentos' | 'Limpieza' | 'Pegamentos' | 'Resina' | 'Silicona';
    unidadBase: mongoose.Types.ObjectId | string;
    stock: number;
    precioUnitario: number;
    presentaciones: IPresentacion[];
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
export declare const Material: mongoose.Model<IMaterial, {}, {}, {}, mongoose.Document<unknown, {}, IMaterial, {}, {}> & IMaterial & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Material.d.ts.map