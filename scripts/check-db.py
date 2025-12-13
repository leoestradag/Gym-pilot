#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    # Connect to the database
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Query to get all tables
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
    """)
    
    tables = cursor.fetchall()
    
    print("✅ Conexión exitosa a la base de datos Neon\n")
    print(f"📊 Tablas encontradas ({len(tables)}):\n")
    
    for table in tables:
        table_name = table[0]
        # Get row count for each table
        cursor.execute(f'SELECT COUNT(*) FROM "{table_name}";')
        count = cursor.fetchone()[0]
        print(f"  - {table_name}: {count} registros")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error al conectar: {e}")
    sys.exit(1)


