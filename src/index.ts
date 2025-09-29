import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database.js';
import { Patient } from './models/Patient.js';

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

app.get('/api/database', (req, res) => {
  res.json({
    message: 'Base de datos MongoDB Atlas conectada',
    database: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    timestamp: new Date().toISOString()
  });
});

// ENDPOINTS DE PACIENTES
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ fechaCreacion: -1 });
    res.json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener pacientes',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos (nombre, email, telefono)'
      });
    }

    const newPatient = new Patient({
      nombre,
      email,
      telefono
    });

    const savedPatient = await newPatient.save();

    res.status(201).json({
      success: true,
      message: 'Paciente creado exitosamente',
      data: savedPatient
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear paciente',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    availableEndpoints: ['/health', '/api/hello', '/api/database', '/api/patients']
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