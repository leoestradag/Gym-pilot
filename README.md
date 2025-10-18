# TessAlp Gyms

Sistema de gestión integral para gimnasios desarrollado con Next.js 15 y React 19.

## 🏋️ Características

- **Panel de Administración Completo**
  - Gestión de membresías
  - Control de check-ins con escáner QR
  - Programación de clases
  - Panel financiero con gráficos y métricas
  - Marketing y comunicaciones
  - Asistente IA para soporte

- **Portal Público**
  - Vista de gimnasios con información detallada
  - Consulta de horarios y clases
  - Información de instalaciones
  - Página de contacto
  - Sistema de membresías

## 🚀 Tecnologías

- **Framework:** Next.js 15.2.4
- **React:** 19
- **TypeScript:** 5
- **Estilos:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Gráficos:** Recharts
- **Formularios:** React Hook Form + Zod
- **Gestión de Estado:** React Hooks
- **Base de Datos:** Scripts SQL incluidos

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [tu-repo-url]

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
pnpm dev
```

## 🛠️ Scripts Disponibles

```bash
pnpm dev      # Inicia el servidor de desarrollo
pnpm build    # Construye la aplicación para producción
pnpm start    # Inicia el servidor de producción
pnpm lint     # Ejecuta el linter
```

## 📁 Estructura del Proyecto

```
tessalp-gyms/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   │   ├── asistente/     # Asistente IA
│   │   ├── checkin/       # Sistema de check-in
│   │   ├── clases/        # Gestión de clases
│   │   ├── finanzas/      # Panel financiero
│   │   ├── marketing/     # Marketing
│   │   └── membresias/    # Gestión de membresías
│   └── gym/               # Portal público de gimnasios
├── components/            # Componentes React reutilizables
│   └── ui/               # Componentes UI base
├── hooks/                # Custom React hooks
├── lib/                  # Utilidades y configuración
├── public/               # Archivos estáticos
└── scripts/              # Scripts SQL para base de datos
```

## 🗄️ Base de Datos

Los scripts SQL para crear las tablas e insertar datos de prueba se encuentran en la carpeta `scripts/`:

- `01-create-tables.sql` - Esquema de base de datos
- `02-seed-data.sql` - Datos de ejemplo

## 🎨 Componentes UI

El proyecto incluye una biblioteca completa de componentes UI basados en Radix UI:

- Formularios, diálogos, tablas
- Gráficos y visualizaciones
- Navegación y menús
- Alertas y notificaciones
- Y mucho más...

## 📄 Licencia

Este proyecto está bajo licencia privada.

## 👥 Autor

Desarrollado para TessAlp Gyms

