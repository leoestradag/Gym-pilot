#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    # Connect to the database
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("🔄 Borrando todas las tablas...\n")
    
    # Get all tables
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE';
    """)
    
    tables = cursor.fetchall()
    
    if not tables:
        print("✅ No hay tablas para borrar")
        cursor.close()
        conn.close()
        sys.exit(0)
    
    # Drop all tables
    for table in tables:
        table_name = table[0]
        try:
            cursor.execute(f'DROP TABLE IF EXISTS "{table_name}" CASCADE;')
            print(f"  ✓ Borrada: {table_name}")
        except Exception as e:
            print(f"  ✗ Error al borrar {table_name}: {e}")
    
    print(f"\n✅ Se borraron {len(tables)} tablas exitosamente")
    print("📊 Base de datos lista para empezar de cero")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)


