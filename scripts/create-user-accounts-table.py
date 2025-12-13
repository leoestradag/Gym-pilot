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
    
    print("🔨 Creando tabla user_accounts...\n")
    
    # Create user_accounts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_accounts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255),
            role VARCHAR(50) DEFAULT 'MEMBER',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    # Create index on email for faster lookups
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_user_accounts_email ON user_accounts(email);
    """)
    
    print("✅ Tabla 'user_accounts' creada exitosamente\n")
    print("📋 Campos de la tabla:")
    print("  - id: ID único (auto-incremental)")
    print("  - name: Nombre completo del usuario")
    print("  - email: Correo electrónico (único)")
    print("  - password_hash: Contraseña hasheada")
    print("  - role: Rol del usuario (MEMBER, COACH, ADMIN)")
    print("  - created_at: Fecha de creación")
    print("  - updated_at: Fecha de última actualización")
    
    # Verify table was created
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user_accounts';
    """)
    
    if cursor.fetchone():
        print("\n✅ Verificación: La tabla existe en la base de datos")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)


