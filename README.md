# 📊 Dashboard Financiero - Frontend (React + SASS)

Este repositorio contiene la interfaz de usuario desarrollada en React para el sistema de gestión de finanzas.
La aplicación actúa como el orquestador visual de una arquitectura basada en microservicios, consumiendo datos de forma simultánea desde:

- Un servicio de autenticación (Drizzle ORM)
- Un servicio financiero (Sequelize)

## 🎯 Requisitos de la Prueba Cumplidos

- **Arquitectura desacoplada**: El frontend consume dos microservicios independientes que comparten la misma base de datos.
- **Sin librerías de UI**: Estilizado 100% manual con SASS (variables, mixins y anidamiento).
- **Seguridad JWT**: Implementación completa del flujo de autenticación y protección de rutas.
- **Visualización de datos**: Uso de Recharts para el análisis de tendencias financieras.

## 🚀 Características Principales

- **Panel de Control (Dashboard)**: Resumen de KPIs (Ventas, Gastos, Balance Neto) y gráfico de líneas dinámico.
- **Gestión CRUD**: Control total sobre ingresos y egresos con borrado lógico (soft delete).
- **Seguridad Avanzada**:
  - ProtectedRoute: Bloquea el acceso a usuarios no autenticados.
  - PublicRoute: Impide que usuarios logueados vuelvan a Login/Register.
- **Filtros de Tiempo**: Segmentación por día, semana, mes y año directamente desde la interfaz.
- **Importación Masiva**: Botón dedicado para la carga de archivos JSON hacia la base de datos vía microservicio.

## 🛠️ Stack Tecnológico

- React 18 (Vite)
- SASS (Arquitectura modular y responsive)
- Recharts (Visualización interactiva)
- Axios (Interceptores para inyección de JWT y manejo de errores 401)
- React Router DOM v6 (Navegación protegida)

## 📦 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/VicCurzio/frontend-dashboard-finance.git
cd frontend-dashboard-finance
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto con las URLs de tus microservicios (asegúrate de que los puertos coincidan con tus backends):
```
VITE_API_AUTH=http://localhost:3002/api
VITE_API_FINANCE=http://localhost:3001/api
```

### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```

## 🎨 Estructura de Estilos (SASS)

Se ha seguido una metodología de diseño limpia y escalable:

- **Variables Globales**: Centralización de colores corporativos ($primary, $success, $danger) y tipografías.
- **Mixins y Flexbox**: Uso de @mixin para centrado absoluto y estructuras de tarjetas, evitando código redundante.
- **Glassmorphism**: Efectos de desenfoque y transparencia en modales y tarjetas para una estética moderna.
- **Animaciones**: Transiciones suaves en modales de éxito y mensajes de error (shake effect).

## 📥 Pruebas de Carga Masiva (JSON)

En la raiz del proyecto encontrarás archivos de ejemplo:

- importar_ventas.json
- importar_gastos.json

**Pasos:**

1. Navega a la sección de Ventas o Gastos.
2. Haz clic en Importar JSON.
3. Selecciona el archivo y observa cómo el Dashboard se actualiza automáticamente con los nuevos datos.

## 💡 Nota sobre Microservicios

Esta aplicación espera que los siguientes microservicios estén activos:

- **Auth Service**: 
- **Finance Service**: 