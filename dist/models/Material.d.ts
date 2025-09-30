import mongoose, { Document } from 'mongoose';
export interface IMaterial extends Document {
    nombre: string;
    descripcion?: string;
    imagen?: string;
    unidad: mongoose.Types.ObjectId | string;
    stock: number;
    precioUnitario: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
export declare const Material: mongoose.Model<IMaterial, {}, {}, {}, mongoose.Document<unknown, {}, IMaterial, {}, {}> & IMaterial & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Material.d.ts.map