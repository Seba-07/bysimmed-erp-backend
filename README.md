# bySIMMED Hello PWA - Backend

Backend de validación para el proyecto PWA de bySIMMED. API simple en Node.js + TypeScript + Express.

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
npm install
```

### Variables de Entorno
Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Configurar variables:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000
```

### Ejecutar en Desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### Scripts Disponibles
- `npm run dev` - Desarrollo con hot reload (tsx watch)
- `npm run build` - Compilar TypeScript a JavaScript
- `npm run start` - Ejecutar versión compilada
- `npm run type-check` - Verificar tipos sin compilar

## 🌐 Endpoints

### GET /health
Endpoint de salud del servicio.

**Respuesta:**
```json
{
  "ok": true,
  "env": "development",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/hello
Endpoint de prueba para validar conectividad con el frontend.

**Respuesta:**
```json
{
  "message": "Hola bySIMMED desde Railway",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "env": "development"
}
```

## 🚂 Despliegue en Railway

### Pasos para Desplegar

1. **Crear cuenta en Railway** → https://railway.app

2. **Crear nuevo proyecto:**
   - "New Project" → "Deploy from GitHub repo"
   - Conectar y seleccionar tu repositorio

3. **Configurar variables de entorno en Railway:**
   ```
   NODE_ENV=production
   CORS_ORIGINS=https://tu-frontend.vercel.app
   ```
   ⚠️ **IMPORTANTE:** Reemplazar `tu-frontend.vercel.app` con la URL real de Vercel

4. **Railway detectará automáticamente:**
   - Build Command: `npm run build`
   - Start Command: `npm run start`
   - Port: Variable `PORT` (Railway la asigna automáticamente)

5. **Verificar despliegue:**
   - Railway proporcionará una URL como `https://xxx.railway.app`
   - Probar: `https://xxx.railway.app/health`
   - Probar: `https://xxx.railway.app/api/hello`

### Verificaciones Post-Despliegue

✅ **Endpoint /health responde correctamente**
```bash
curl https://tu-app.railway.app/health
```

✅ **Endpoint /api/hello responde correctamente**
```bash
curl https://tu-app.railway.app/api/hello
```

✅ **CORS configurado correctamente**
- El frontend en Vercel puede consumir la API sin errores de CORS

## 🔧 Configuración CORS

El backend implementa CORS estricto:

- **Desarrollo:** Permite cualquier origen (`true`)
- **Producción:** Solo permite orígenes en `CORS_ORIGINS`

### Formato CORS_ORIGINS
```env
# Un solo origen
CORS_ORIGINS=https://mi-app.vercel.app

# Múltiples orígenes (separados por comas)
CORS_ORIGINS=https://mi-app.vercel.app,https://otro-dominio.com
```

## 🛠️ Tecnologías

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Lenguaje:** TypeScript
- **CORS:** cors middleware
- **Development:** tsx (reemplazo rápido de ts-node)

## 📁 Estructura del Proyecto

```
bysimmed_hello_pwa_backend/
├── src/
│   └── index.ts          # Servidor Express principal
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración TypeScript
├── .env.example          # Template de variables de entorno
└── README.md            # Esta documentación
```

## 🔍 Solución de Problemas

### Error: Cannot GET /api/hello
- Verificar que el servidor esté ejecutándose
- Confirmar la URL del endpoint (incluir `/api/` en la ruta)

### Error de CORS en producción
- Verificar que `CORS_ORIGINS` incluya la URL exacta del frontend
- No incluir barra final (`/`) en las URLs de CORS_ORIGINS

### Error de inicio en Railway
- Verificar que el comando `npm run build` complete exitosamente
- Confirmar que `npm run start` ejecute `node dist/index.js`

## 📝 Notas

- El puerto se asigna automáticamente en Railway via variable `PORT`
- Logs detallados de CORS y arranque disponibles en consola
- Endpoints no encontrados devuelven 404 con lista de endpoints disponibles