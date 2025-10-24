import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database.js';
import cotizacionesRouter from './routes/cotizaciones.js';
import ordenesCompraRouter from './routes/ordenesCompra.js';
import postVentaRouter from './routes/postVenta.js';
import clientesRouter from './routes/clientes.js';
import proveedoresRouter from './routes/proveedores.js';
import comprasRouter from './routes/compras.js';
import gastosRouter from './routes/gastos.js';
import finanzasRouter from './routes/finanzas.js';
import modelosRouter from './routes/modelos.js';
import componentesRouter from './routes/componentes.js';
import materialesRouter from './routes/materiales.js';
import currencyRouter from './routes/currency.js';

// Cargar variables de entorno
dotenv.config();

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
    database: 'connected',
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

// Rutas de inventario
app.use('/api/inventario/modelos', modelosRouter);
app.use('/api/inventario/componentes', componentesRouter);
app.use('/api/inventario/materiales', materialesRouter);

// Rutas de ventas
app.use('/api/ventas/clientes', clientesRouter);
app.use('/api/ventas/cotizaciones', cotizacionesRouter);
app.use('/api/ventas/ordenes-compra', ordenesCompraRouter);

// Rutas de post-venta
app.use('/api/post-venta', postVentaRouter);

// Rutas de finanzas
app.use('/api/finanzas/proveedores', proveedoresRouter);
app.use('/api/finanzas/compras', comprasRouter);
app.use('/api/finanzas/gastos', gastosRouter);
app.use('/api/finanzas', finanzasRouter);

// Rutas de utilidades
app.use('/api/currency', currencyRouter);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    availableEndpoints: [
      '/health',
      '/api/hello',
      '/api/inventario/modelos',
      '/api/inventario/componentes',
      '/api/inventario/materiales',
      '/api/ventas/clientes',
      '/api/ventas/cotizaciones',
      '/api/ventas/ordenes-compra',
      '/api/post-venta/clientes',
      '/api/post-venta/equipos',
      '/api/finanzas/proveedores',
      '/api/finanzas/compras',
      '/api/finanzas/gastos',
      '/api/finanzas/cuentas-bancarias',
      '/api/finanzas/cuentas-por-cobrar',
      '/api/currency/usd-clp'
    ]
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDatabase();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor bySIMMED ERP backend ejecutándose en puerto ${PORT}`);
      console.log(`📝 Entorno: ${NODE_ENV}`);
      console.log(`🌐 CORS Origins: ${corsOrigins.length > 0 ? corsOrigins.join(', ') : 'Permitir todo (dev)'}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error);
    process.exit(1);
  }
};

startServer();