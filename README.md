# 📊 Financial Dashboard - Frontend

Este repositorio contiene la interfaz de usuario desarrollada en **React** para el sistema de gestión de finanzas personales. La aplicación está diseñada bajo una arquitectura de microservicios, consumiendo datos de forma simultánea de un servicio de autenticación y un servicio financiero.

## 🎯 Objetivo de la Prueba
Desarrollar una aplicación robusta y escalable que demuestre el dominio de:
- Consumo de múltiples APIs independientes.
- Gestión de estado complejo y efectos en React.
- Estilizado profesional y modular con **SASS** sin librerías de componentes externas.
- Implementación de flujos de carga masiva de datos.

## 🚀 Características
- **Dashboard Integral:** Visualización de KPIs (Ventas, Gastos, Saldo) y gráficos de tendencia con **Recharts**.
- **Gestión de Movimientos:** CRUD completo para Ventas y Gastos con categorización.
- **Filtros Dinámicos:** Segmentación de datos por Día, Semana, Mes o Año.
- **Importación Masiva:** Procesamiento de archivos JSON para carga rápida de registros.
- **Arquitectura de Estilos:** Uso avanzado de SASS (Variables globales, anidamiento y herencia con `@extend`).

## 🛠️ Tecnologías
- **React 18** (Vite)
- **SASS** (Arquitectura modular de estilos)
- **Recharts** (Gráficos interactivos)
- **Axios** (Configurado con interceptores para manejo de JWT)
- **React Router Dom** (Navegación protegida)

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
   cd nombre-del-repo
Instalar dependencias:

Bash

npm install
Variables de Entorno: Crea un archivo .env en la raíz y configura las rutas de tus microservicios:

Fragmento de código

VITE_API_AUTH=http://localhost:3001/api
VITE_API_FINANCE=http://localhost:3000/api
Correr la App:

Bash

npm run dev
📥 Prueba de Carga Masiva (JSON)
Para facilitar la evaluación, se han incluido dos archivos de ejemplo en la raíz del proyecto (o carpeta /public) que contienen datos normalizados:

importar_ventas.json: Contiene un set de 15 registros de ventas con diferentes fechas y categorías.

importar_gastos.json: Contiene un set de 15 registros de gastos para visualizar el balance en el gráfico.

Instrucciones: 1. Ve a la sección de Ventas o Gastos. 2. Haz clic en el botón 📥 Importar JSON. 3. Selecciona el archivo correspondiente y los datos se verán reflejados inmediatamente.

🎨 Estructura de Estilos (SASS)
Se implementó una hoja de estilos organizada que utiliza:

Variables Globales: Control de paleta de colores ($primary, $success, $danger), sombras y espaciados.

Herencia (@extend): Reutilización de estructuras complejas como .card y .btn para mantener un código DRY.

Layout: Sistema de Scroll independiente para el contenido principal mediante un contenedor flexible.

🛡️ Notas Técnicas
Consistencia de Datos: Se aplica una normalización de fechas ISO para garantizar que no haya desfases de días al importar datos desde diferentes zonas horarias.

Seguridad: Los interceptores de Axios adjuntan el token de autorización en cada solicitud y manejan la redirección al login en caso de tokens expirados.