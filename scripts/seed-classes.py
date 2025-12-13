#!/usr/bin/env python3
import psycopg2
import sys

# Connection string
DATABASE_URL = "postgresql://neondb_owner:npg_AY0P6hXyDTQd@ep-calm-tooth-ahh8mdr1-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Initial classes from the code
initial_classes = [
    {
        "name": "Yoga Matutino",
        "instructor_name": "Ana López",
        "day_of_week": "lunes",
        "time": "07:00",
        "duration": 60,
        "capacity": 20,
        "enrolled": 18,
        "type": "Yoga",
        "price": 0,
        "description": None,
    },
    {
        "name": "Spinning",
        "instructor_name": "María González",
        "day_of_week": "martes",
        "time": "06:30",
        "duration": 45,
        "capacity": 25,
        "enrolled": 22,
        "type": "Cardio",
        "price": 0,
        "description": None,
    },
    {
        "name": "Pilates",
        "instructor_name": "Ana López",
        "day_of_week": "miercoles",
        "time": "10:00",
        "duration": 60,
        "capacity": 15,
        "enrolled": 12,
        "type": "Pilates",
        "price": 0,
        "description": None,
    },
]

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    print("🔄 Insertando clases iniciales en la base de datos...\n")
    
    # Check existing classes to avoid duplicates
    cursor.execute("SELECT name, day_of_week, time FROM classes;")
    existing_classes = cursor.fetchall()
    existing_set = {(name, day, time) for name, day, time in existing_classes}
    
    inserted_count = 0
    skipped_count = 0
    
    for class_data in initial_classes:
        # Check if class already exists
        class_key = (class_data["name"], class_data["day_of_week"], class_data["time"])
        if class_key in existing_set:
            print(f"  ⏭️  Omitida: {class_data['name']} ({class_data['day_of_week']} {class_data['time']}) - ya existe")
            skipped_count += 1
            continue
        
        # Insert class
        cursor.execute("""
            INSERT INTO classes (
                name, instructor_name, day_of_week, time, duration, 
                capacity, enrolled, type, price, description
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            class_data["name"],
            class_data["instructor_name"],
            class_data["day_of_week"],
            class_data["time"],
            class_data["duration"],
            class_data["capacity"],
            class_data["enrolled"],
            class_data["type"],
            class_data["price"],
            class_data["description"],
        ))
        
        print(f"  ✅ Insertada: {class_data['name']} ({class_data['day_of_week']} {class_data['time']})")
        inserted_count += 1
    
    conn.commit()
    
    print(f"\n✅ Proceso completado:")
    print(f"   - Clases insertadas: {inserted_count}")
    print(f"   - Clases omitidas (ya existían): {skipped_count}")
    
    # Show total classes
    cursor.execute("SELECT COUNT(*) FROM classes;")
    total = cursor.fetchone()[0]
    print(f"   - Total de clases en la base de datos: {total}\n")
    
    cursor.close()
    conn.close()
    
except psycopg2.Error as e:
    print(f"❌ Error: {e}")
    sys.exit(1)


