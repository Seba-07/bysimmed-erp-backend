import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
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
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
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
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    stock: number;
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
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
    precioVenta: number;
    materiales: mongoose.Types.DocumentArray<{
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        materialId: mongoose.Types.ObjectId;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Componente.d.ts.map