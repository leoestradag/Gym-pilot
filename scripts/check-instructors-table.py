#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Check if instructors table exists
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'instructors';
    """)
    
    if cursor.fetchone():
        print("✅ La tabla 'instructors' existe")
        
        # Get structure
        cursor.execute("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'instructors'
            ORDER BY ordinal_position;
        """)
        
        columns = cursor.fetchall()
        print("\n📋 Estructura de la tabla:")
        for col in columns:
            print(f"  - {col[0]}: {col[1]}")
        
        # Get count
        cursor.execute("SELECT COUNT(*) FROM instructors;")
        count = cursor.fetchone()[0]
        print(f"\n📊 Registros en la tabla: {count}")
    else:
        print("❌ La tabla 'instructors' NO existe")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

