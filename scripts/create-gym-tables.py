#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("🔨 Creando tablas para información de gimnasios...\n")
    
    # 1. Create or update gyms table
    print("1. Creando/actualizando tabla 'gyms'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gyms (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            hours TEXT NOT NULL,
            image TEXT,
            slug TEXT,
            admin_code TEXT,
            password_hash TEXT,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    print("   ✅ Tabla 'gyms' creada")
    
    # Add new columns if they don't exist
    try:
        cursor.execute("ALTER TABLE gyms ADD COLUMN IF NOT EXISTS slug TEXT;")
        cursor.execute("ALTER TABLE gyms ADD COLUMN IF NOT EXISTS admin_code TEXT;")
        cursor.execute("ALTER TABLE gyms ADD COLUMN IF NOT EXISTS password_hash TEXT;")
        print("   ✅ Columnas adicionales verificadas")
    except Exception as e:
        print(f"   ⚠️  Error al agregar columnas: {e}")
    
    # Create unique indexes
    try:
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS gyms_slug_key ON gyms(slug) WHERE slug IS NOT NULL;")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS gyms_admin_code_key ON gyms(admin_code) WHERE admin_code IS NOT NULL;")
        print("   ✅ Índices únicos creados")
    except Exception as e:
        print(f"   ⚠️  Error al crear índices: {e}")
    
    # 2. Create gym_facilities table
    print("\n2. Creando tabla 'gym_facilities'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gym_facilities (
            id SERIAL PRIMARY KEY,
            gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT,
            features TEXT[] DEFAULT '{}',
            icon TEXT,
            "order" INTEGER DEFAULT 0,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    print("   ✅ Tabla 'gym_facilities' creada")
    
    # 3. Create gym_amenities table
    print("\n3. Creando tabla 'gym_amenities'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gym_amenities (
            id SERIAL PRIMARY KEY,
            gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT,
            icon TEXT,
            "order" INTEGER DEFAULT 0,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    print("   ✅ Tabla 'gym_amenities' creada")
    
    # 4. Create gym_membership_plans table
    print("\n4. Creando tabla 'gym_membership_plans'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gym_membership_plans (
            id SERIAL PRIMARY KEY,
            gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            price DOUBLE PRECISION NOT NULL,
            period TEXT DEFAULT 'mes',
            description TEXT,
            features TEXT[] DEFAULT '{}',
            popular BOOLEAN DEFAULT false,
            color TEXT,
            "order" INTEGER DEFAULT 0,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );
    """)
    print("   ✅ Tabla 'gym_membership_plans' creada")
    
    # 5. Create gym_schedules table
    print("\n5. Creando tabla 'gym_schedules'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gym_schedules (
            id SERIAL PRIMARY KEY,
            gym_id INTEGER NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
            day_of_week TEXT NOT NULL,
            open_time TEXT NOT NULL,
            close_time TEXT NOT NULL,
            is_closed BOOLEAN DEFAULT false,
            created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(gym_id, day_of_week)
        );
    """)
    print("   ✅ Tabla 'gym_schedules' creada")
    
    print("\n✅ Todas las tablas creadas exitosamente\n")
    print("📋 Resumen de tablas:")
    print("   - gyms (actualizada con slug, admin_code, password_hash)")
    print("   - gym_facilities (instalaciones del gimnasio)")
    print("   - gym_amenities (amenidades del gimnasio)")
    print("   - gym_membership_plans (planes de membresía)")
    print("   - gym_schedules (horarios por día de la semana)")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

