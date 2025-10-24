import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Crear directorios si no existen
const uploadDir = 'uploads'
const modelosDir = path.join(uploadDir, 'modelos')
const cotizacionesDir = path.join(uploadDir, 'cotizaciones')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}
if (!fs.existsSync(modelosDir)) {
  fs.mkdirSync(modelosDir, { recursive: true })
}
if (!fs.existsSync(cotizacionesDir)) {
  fs.mkdirSync(cotizacionesDir, { recursive: true })
}

// Configuración para PDFs de modelos
const modelosStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, modelosDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'modelo-' + uniqueSuffix + path.extname(file.originalname))
  }
})

export const uploadModeloPDF = multer({
  storage: modelosStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten archivos PDF'))
    }
  }
})
