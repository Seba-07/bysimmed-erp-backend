import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || '';
export const connectDatabase = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB Atlas');
        // Verificar conexión
        const dbName = mongoose.connection.db?.databaseName;
        console.log(`📊 Base de datos: ${dbName}`);
    }
    catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        process.exit(1);
    }
};
export const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
    }
    catch (error) {
        console.error('❌ Error desconectando de MongoDB:', error);
    }
};
// Manejar eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose conectado a MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('🔴 Error en conexión Mongoose:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('🟡 Mongoose desconectado');
});
//# sourceMappingURL=database.js.map