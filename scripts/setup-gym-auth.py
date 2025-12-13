#!/usr/bin/env python3
import psycopg2
import bcrypt
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    print("🔐 Configurando autenticación para gimnasios...\n")
    
    # Get all gyms
    cursor.execute("SELECT id, name FROM gyms;")
    gyms = cursor.fetchall()
    
    if not gyms:
        print("⚠️  No hay gimnasios en la base de datos.")
        print("   Primero necesitas crear gimnasios antes de configurar autenticación.")
        cursor.close()
        conn.close()
        sys.exit(0)
    
    print(f"📋 Gimnasios encontrados: {len(gyms)}\n")
    
    for gym_id, gym_name in gyms:
        print(f"Gimnasio: {gym_name} (ID: {gym_id})")
        
        # Check if already has admin_code
        cursor.execute("SELECT admin_code, password_hash FROM gyms WHERE id = %s;", (gym_id,))
        result = cursor.fetchone()
        current_code = result[0] if result else None
        current_hash = result[1] if result else None
        
        # Generate admin code if not exists
        if not current_code:
            admin_code = f"GYM{gym_id:03d}"
            cursor.execute(
                "UPDATE gyms SET admin_code = %s WHERE id = %s;",
                (admin_code, gym_id)
            )
            print(f"  ✅ Código de administrador: {admin_code}")
        else:
            admin_code = current_code
            print(f"  ℹ️  Código existente: {admin_code}")
        
        # Generate slug if not exists
        cursor.execute("SELECT slug FROM gyms WHERE id = %s;", (gym_id,))
        slug_result = cursor.fetchone()
        if not slug_result or not slug_result[0]:
            # Generate slug from name
            slug = gym_name.lower().replace(" ", "-").replace("'", "").replace(".", "")
            cursor.execute(
                "UPDATE gyms SET slug = %s WHERE id = %s;",
                (slug, gym_id)
            )
            print(f"  ✅ Slug generado: {slug}")
        
        # Set default password if not exists
        if not current_hash:
            # Default password: "admin123" (should be changed after first login)
            default_password = "admin123"
            password_hash = bcrypt.hashpw(default_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            cursor.execute(
                "UPDATE gyms SET password_hash = %s WHERE id = %s;",
                (password_hash, gym_id)
            )
            print(f"  ✅ Contraseña por defecto configurada: {default_password}")
            print(f"     ⚠️  IMPORTANTE: Cambia esta contraseña después del primer inicio de sesión")
        else:
            print(f"  ℹ️  Contraseña ya configurada")
        
        print()
    
    conn.commit()
    print("✅ Configuración completada\n")
    print("📝 Resumen:")
    print("   - Cada gimnasio tiene un código de administrador único (GYM001, GYM002, etc.)")
    print("   - Contraseña por defecto: 'admin123' (cambiar después del primer login)")
    print("   - Los gimnasios pueden iniciar sesión en: /admin/gym/login")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
except ImportError:
    print("❌ Error: bcrypt no está instalado")
    print("   Instala con: pip install bcrypt")
    sys.exit(1)


