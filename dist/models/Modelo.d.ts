import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
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
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigo: string;
    nombre: string;
    activo: boolean;
    componentes: mongoose.Types.DocumentArray<{
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }> & {
        cantidad: number;
        componenteId: mongoose.Types.ObjectId;
    }>;
    stock: number;
    precioVenta: number;
    imagen?: string | null | undefined;
    pdfTecnico?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=Modelo.d.ts.map