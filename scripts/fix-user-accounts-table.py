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
    
    print("🔧 Ajustando tabla user_accounts para que coincida con Prisma...\n")
    
    # Drop the table if it exists
    cursor.execute('DROP TABLE IF EXISTS "user_accounts" CASCADE;')
    print("  ✓ Tabla anterior eliminada")
    
    # Create the enum type for UserRole
    cursor.execute("""
        DO $$ BEGIN
            CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'COACH', 'ADMIN');
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;
    """)
    print("  ✓ Enum UserRole creado")
    
    # Create user_accounts table matching Prisma schema exactly
    cursor.execute("""
        CREATE TABLE "user_accounts" (
            "id" SERIAL NOT NULL,
            "name" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "password_hash" TEXT,
            "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
            "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
        );
    """)
    print("  ✓ Tabla user_accounts creada")
    
    # Create unique constraint on email
    cursor.execute("""
        CREATE UNIQUE INDEX "user_accounts_email_key" ON "user_accounts"("email");
    """)
    print("  ✓ Índice único en email creado")
    
    # Create index on email for faster lookups
    cursor.execute("""
        CREATE INDEX IF NOT EXISTS "idx_user_accounts_email" ON "user_accounts"("email");
    """)
    print("  ✓ Índice en email creado")
    
    print("\n✅ Tabla 'user_accounts' ajustada correctamente para Prisma\n")
    print("📋 Estructura final:")
    print("  - id: SERIAL (PRIMARY KEY)")
    print("  - name: TEXT NOT NULL")
    print("  - email: TEXT NOT NULL (UNIQUE)")
    print("  - password_hash: TEXT")
    print("  - role: UserRole ENUM (MEMBER, COACH, ADMIN) DEFAULT 'MEMBER'")
    print("  - created_at: TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP")
    print("  - updated_at: TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)


