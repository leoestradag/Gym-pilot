#!/usr/bin/env python3
import psycopg2
import sys

# Connection string DIRECT (sin pooler)
DATABASE_URL_DIRECT = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

print("🔍 Probando connection string directo (sin pooler)...\n")

try:
    conn = psycopg2.connect(DATABASE_URL_DIRECT)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM user_accounts;")
    count = cursor.fetchone()[0]
    print(f"✅ Conexión exitosa con connection string directo!")
    print(f"   Usuarios en la base de datos: {count}")
    cursor.close()
    conn.close()
    print("\n✅ Este es el connection string que debes usar en Render:")
    print(f"   {DATABASE_URL_DIRECT}")
except psycopg2.Error as e:
    print(f"❌ Error con connection string directo: {e}")
    print("\n⚠️  Necesitas obtener el connection string directo desde Neon:")
    print("   1. Ve a tu proyecto en Neon")
    print("   2. Selecciona 'Direct connection' (no 'Pooled connection')")
    print("   3. Copia el connection string")
    sys.exit(1)


