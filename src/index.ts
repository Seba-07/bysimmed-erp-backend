import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuración CORS
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) || [];
const corsOptions = {
  origin: NODE_ENV === 'development' ? true : corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoints
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    env: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hola bySIMMED ERP desde Railway',
    timestamp: new Date().toISOString(),
    env: NODE_ENV
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    availableEndpoints: ['/health', '/api/hello']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor bySIMMED ERP backend ejecutándose en puerto ${PORT}`);
  console.log(`📝 Entorno: ${NODE_ENV}`);
  console.log(`🌐 CORS Origins: ${corsOrigins.length > 0 ? corsOrigins.join(', ') : 'Permitir todo (dev)'}`);
});