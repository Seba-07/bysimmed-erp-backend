import mongoose, { Document } from 'mongoose';
export interface IUnit extends Document {
    nombre: string;
    abreviatura: string;
    tipo?: string;
    fechaCreacion: Date;
}
export declare const Unit: mongoose.Model<IUnit, {}, {}, {}, mongoose.Document<unknown, {}, IUnit, {}, {}> & IUnit & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Unit.d.ts.map