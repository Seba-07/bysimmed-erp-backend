import mongoose, { Document } from 'mongoose';
interface MaterialItem {
    materialId: mongoose.Types.ObjectId;
    cantidad: number;
}
export interface IComponent extends Document {
    nombre: string;
    descripcion?: string;
    imagen?: string;
    materiales: MaterialItem[];
    stock: number;
    precioUnitario: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
export declare const Component: mongoose.Model<IComponent, {}, {}, {}, mongoose.Document<unknown, {}, IComponent, {}, {}> & IComponent & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=Component.d.ts.map