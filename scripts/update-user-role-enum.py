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
    
    print("🔄 Actualizando enum UserRole para agregar USER...\n")
    
    # Check if USER already exists in the enum
    cursor.execute("""
        SELECT enumlabel 
        FROM pg_enum 
        WHERE enumtypid = (
            SELECT oid 
            FROM pg_type 
            WHERE typname = 'UserRole'
        ) AND enumlabel = 'USER';
    """)
    
    if cursor.fetchone():
        print("✅ 'USER' ya existe en el enum UserRole")
    else:
        # Add USER to the enum (must be added before MEMBER to maintain order)
        cursor.execute("ALTER TYPE \"UserRole\" ADD VALUE IF NOT EXISTS 'USER' BEFORE 'MEMBER';")
        print("✅ Agregado 'USER' al enum UserRole")
    
    # Update default value for the role column
    cursor.execute("""
        ALTER TABLE user_accounts 
        ALTER COLUMN role SET DEFAULT 'USER'::"UserRole";
    """)
    print("✅ Valor por defecto actualizado a 'USER'")
    
    # Show current enum values
    cursor.execute("""
        SELECT enumlabel 
        FROM pg_enum 
        WHERE enumtypid = (
            SELECT oid 
            FROM pg_type 
            WHERE typname = 'UserRole'
        )
        ORDER BY enumsortorder;
    """)
    
    enum_values = cursor.fetchall()
    print("\n📋 Valores actuales del enum UserRole:")
    for value in enum_values:
        print(f"  - {value[0]}")
    
    cursor.close()
    conn.close()
    
    print("\n✅ Enum actualizado exitosamente")
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)

