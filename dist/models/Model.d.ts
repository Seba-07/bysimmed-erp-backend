import mongoose, { Document } from 'mongoose';
interface ComponentItem {
    componentId: mongoose.Types.ObjectId;
    cantidad: number;
}
export interface IModel extends Document {
    nombre: string;
    descripcion?: string;
    imagen?: string;
    componentes: ComponentItem[];
    stock: number;
    precioUnitario: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
export declare const Model: mongoose.Model<IModel, {}, {}, {}, mongoose.Document<unknown, {}, IModel, {}, {}> & IModel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=Model.d.ts.map