-- Seed data for Tessalp Gyms

-- Insert membership plans
INSERT INTO membership_plans (name, duration_days, price, benefits) VALUES
('Básico', 30, 599.00, ARRAY['Acceso al gimnasio', 'Vestuarios y duchas', 'Asesoría inicial']),
('Medio', 90, 1599.00, ARRAY['Acceso al gimnasio', 'Vestuarios y duchas', '2 clases grupales/semana', 'Plan nutricional básico', 'Asesoría mensual']),
('Avanzado', 90, 2499.00, ARRAY['Acceso ilimitado', 'Todas las clases grupales', 'Plan nutricional personalizado', 'Entrenador personal 2x/semana', 'Acceso a zona VIP', 'Toalla incluida'])
ON CONFLICT DO NOTHING;

-- Insert instructors
INSERT INTO instructors (name, email, phone, specialty, bio) VALUES
('Carlos Mendoza', 'carlos@tessalp.com', '+5215551234567', 'CrossFit', 'Certificado CrossFit L2 con 8 años de experiencia'),
('Ana García', 'ana@tessalp.com', '+5215551234568', 'Yoga', 'Instructora de Yoga certificada, especialista en Vinyasa y Hatha'),
('Miguel Torres', 'miguel@tessalp.com', '+5215551234569', 'Spinning', 'Instructor de ciclismo indoor con certificación internacional'),
('Laura Martínez', 'laura@tessalp.com', '+5215551234570', 'Pilates', 'Certificada en Pilates Mat y Reformer, 6 años de experiencia')
ON CONFLICT DO NOTHING;

-- Insert classes
INSERT INTO classes (name, instructor_id, day_of_week, time, duration, capacity, price, description) VALUES
('CrossFit Matutino', 1, 'Lunes', '08:00:00', 60, 20, 150.00, 'Entrenamiento funcional de alta intensidad'),
('Yoga Flow', 2, 'Martes', '09:00:00', 60, 15, 120.00, 'Clase de yoga dinámica para todos los niveles'),
('Spinning Extremo', 3, 'Miércoles', '18:00:00', 45, 25, 130.00, 'Ciclismo indoor de alta intensidad'),
('Pilates Core', 4, 'Jueves', '10:00:00', 50, 12, 140.00, 'Fortalecimiento del core y flexibilidad'),
('CrossFit Vespertino', 1, 'Viernes', '19:00:00', 60, 20, 150.00, 'WOD intenso para terminar la semana'),
('Yoga Restaurativo', 2, 'Sábado', '11:00:00', 75, 15, 120.00, 'Yoga suave para relajación y recuperación')
ON CONFLICT DO NOTHING;

-- Insert sample members
INSERT INTO members (name, email, phone, membership_type, membership_start, membership_end, status) VALUES
('Juan Pérez', 'juan.perez@email.com', '+5215559876543', 'Avanzado', CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '75 days', 'active'),
('María López', 'maria.lopez@email.com', '+5215559876544', 'Medio', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '60 days', 'active'),
('Pedro Sánchez', 'pedro.sanchez@email.com', '+5215559876545', 'Básico', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '25 days', 'active'),
('Sofia Ramírez', 'sofia.ramirez@email.com', '+5215559876546', 'Avanzado', CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE + INTERVAL '45 days', 'active'),
('Diego Fernández', 'diego.fernandez@email.com', '+5215559876547', 'Medio', CURRENT_DATE - INTERVAL '60 days', CURRENT_DATE + INTERVAL '30 days', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample check-ins for today
INSERT INTO checkins (member_id, checkin_time) VALUES
(1, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
(2, CURRENT_TIMESTAMP - INTERVAL '1 hour'),
(3, CURRENT_TIMESTAMP - INTERVAL '30 minutes')
ON CONFLICT DO NOTHING;

-- Insert sample class bookings
INSERT INTO class_bookings (member_id, class_id, booking_date, status) VALUES
(1, 1, CURRENT_DATE + INTERVAL '1 day', 'confirmed'),
(2, 2, CURRENT_DATE + INTERVAL '1 day', 'confirmed'),
(4, 3, CURRENT_DATE + INTERVAL '2 days', 'confirmed'),
(5, 4, CURRENT_DATE + INTERVAL '3 days', 'confirmed')
ON CONFLICT DO NOTHING;
