# Configuración de Base de Datos Neon

## Pasos para conectar a Neon

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Base de datos Neon
DATABASE_URL="tu_connection_string_de_neon_aqui"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Generar el Cliente de Prisma

```bash
npm run db:generate
```

### 3. Sincronizar el Esquema con la Base de Datos

```bash
npm run db:push
```

### 4. (Opcional) Crear Migración

Si prefieres usar migraciones:

```bash
npm run db:migrate
```

### 5. (Opcional) Abrir Prisma Studio

Para ver y gestionar los datos:

```bash
npm run db:studio
```

## Estructura de la Base de Datos

La base de datos incluye las siguientes tablas:

- **members**: Información de los miembros del gimnasio
- **instructors**: Instructores y entrenadores
- **classes**: Clases grupales
- **check_ins**: Registro de asistencia
- **gyms**: Información de los gimnasios

## Funciones Disponibles

El archivo `lib/db.ts` incluye funciones para:

- `getMembers()` - Obtener todos los miembros
- `getMemberById(id)` - Obtener un miembro por ID
- `createMember(data)` - Crear un nuevo miembro
- `updateMember(id, data)` - Actualizar un miembro
- `deleteMember(id)` - Eliminar un miembro
- `getInstructors()` - Obtener instructores
- `getClasses()` - Obtener clases
- `getCheckIns()` - Obtener registros de asistencia
- `getGyms()` - Obtener gimnasios
- `getStats()` - Obtener estadísticas

## Notas Importantes

- Si la base de datos no está disponible, las funciones usarán datos mock
- Todas las funciones incluyen manejo de errores
- Los tipos TypeScript se generan automáticamente desde Prisma
