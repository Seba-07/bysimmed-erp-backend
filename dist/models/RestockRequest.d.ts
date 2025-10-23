import mongoose, { Document } from 'mongoose';
export interface IRestockRequest extends Document {
    materialId: mongoose.Types.ObjectId;
    presentacion: string;
    cantidad: number;
    solicitante: string;
    prioridad: 'baja' | 'media' | 'urgente';
    estado: 'pendiente' | 'en_revision' | 'en_gestion' | 'en_transito' | 'entregado' | 'cancelada';
    fechaSolicitud: Date;
    fechaRevision?: Date;
    fechaGestion?: Date;
    fechaTransito?: Date;
    fechaEntrega?: Date;
    fechaCancelacion?: Date;
    notas?: string;
    notasInternas?: string;
}
export declare const RestockRequest: mongoose.Model<IRestockRequest, {}, {}, {}, mongoose.Document<unknown, {}, IRestockRequest, {}, {}> & IRestockRequest & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=RestockRequest.d.ts.map