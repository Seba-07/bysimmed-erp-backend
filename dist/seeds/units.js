import { Unit } from '../models/Unit.js';
export const seedUnits = async () => {
    try {
        const count = await Unit.countDocuments();
        if (count > 0) {
            console.log('🔢 Ya existen unidades en la base de datos');
            return;
        }
        const defaultUnits = [
            { nombre: 'Kilogramo', abreviatura: 'kg', tipo: 'peso' },
            { nombre: 'Gramo', abreviatura: 'g', tipo: 'peso' },
            { nombre: 'Tonelada', abreviatura: 't', tipo: 'peso' },
            { nombre: 'Litro', abreviatura: 'L', tipo: 'volumen' },
            { nombre: 'Mililitro', abreviatura: 'mL', tipo: 'volumen' },
            { nombre: 'Metro', abreviatura: 'm', tipo: 'longitud' },
            { nombre: 'Centímetro', abreviatura: 'cm', tipo: 'longitud' },
            { nombre: 'Milímetro', abreviatura: 'mm', tipo: 'longitud' },
            { nombre: 'Unidad', abreviatura: 'ud', tipo: 'cantidad' },
            { nombre: 'Docena', abreviatura: 'doc', tipo: 'cantidad' },
            { nombre: 'Caja', abreviatura: 'cja', tipo: 'cantidad' },
            { nombre: 'Paquete', abreviatura: 'pqt', tipo: 'cantidad' }
        ];
        await Unit.insertMany(defaultUnits);
        console.log('✅ Unidades por defecto creadas exitosamente');
    }
    catch (error) {
        console.error('❌ Error creando unidades por defecto:', error);
    }
};
//# sourceMappingURL=units.js.map