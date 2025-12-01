#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("🔨 Creando tabla instructors...\n")
    
    # Create instructors table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS instructors (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT,
            specialty TEXT NOT NULL,
            experience TEXT,
            certifications TEXT,
            rating DOUBLE PRECISION DEFAULT 4.5,
            bio TEXT,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    print("✅ Tabla 'instructors' creada exitosamente\n")
    print("📋 Campos de la tabla:")
    print("  - id: ID único (auto-incremental)")
    print("  - name: Nombre del instructor")
    print("  - email: Email único")
    print("  - phone: Teléfono (opcional)")
    print("  - specialty: Especialidad")
    print("  - experience: Experiencia (opcional, ej: '8 años')")
    print("  - certifications: Certificaciones (opcional, separadas por coma)")
    print("  - rating: Calificación (default: 4.5)")
    print("  - bio: Biografía (opcional)")
    print("  - created_at: Fecha de creación")
    print("  - updated_at: Fecha de última actualización")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

