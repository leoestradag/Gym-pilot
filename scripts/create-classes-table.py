#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("🔨 Creando tabla classes...\n")
    
    # Create classes table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS classes (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            instructor_id INTEGER,
            instructor_name TEXT,
            day_of_week TEXT NOT NULL,
            time TEXT NOT NULL,
            duration INTEGER NOT NULL,
            capacity INTEGER NOT NULL,
            enrolled INTEGER DEFAULT 0,
            type TEXT DEFAULT 'General',
            price DOUBLE PRECISION DEFAULT 0,
            description TEXT,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    print("✅ Tabla 'classes' creada exitosamente\n")
    print("📋 Campos de la tabla:")
    print("  - id: ID único (auto-incremental)")
    print("  - name: Nombre de la clase")
    print("  - instructor_id: ID del instructor (opcional)")
    print("  - instructor_name: Nombre del instructor (opcional)")
    print("  - day_of_week: Día de la semana")
    print("  - time: Hora de la clase")
    print("  - duration: Duración en minutos")
    print("  - capacity: Capacidad máxima")
    print("  - enrolled: Número de inscritos (default: 0)")
    print("  - type: Tipo de clase (default: 'General')")
    print("  - price: Precio (opcional, default: 0)")
    print("  - description: Descripción (opcional)")
    print("  - created_at: Fecha de creación")
    print("  - updated_at: Fecha de última actualización")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

