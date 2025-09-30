import mongoose, { Document } from 'mongoose';
interface IOrderProduct {
    itemId: mongoose.Types.ObjectId;
    itemType: 'Component' | 'Model';
    itemName: string;
    cantidad: number;
    componentesSeleccionados?: mongoose.Types.ObjectId[];
}
export interface IProductionOrder extends Document {
    numeroOrden: string;
    cliente: string;
    productos: IOrderProduct[];
    fechaLimite: Date;
    estado: 'activa' | 'en_proceso' | 'completada' | 'cancelada';
    notas?: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    fechaCompletada?: Date;
}
export declare const ProductionOrder: mongoose.Model<IProductionOrder, {}, {}, {}, mongoose.Document<unknown, {}, IProductionOrder, {}, {}> & IProductionOrder & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=ProductionOrder.d.ts.map