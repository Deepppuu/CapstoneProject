SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO user (id, name, email, password) VALUES
(1, 'Test User', 'testuser@example.com', 'password123'),
(2, 'Deepika', 'deepika@gmail.com', 'password123');

INSERT INTO service_entity (id, name, description, price) VALUES
(1, 'Haircut', 'Basic haircut service', 200),
(2, 'Hair Trim', 'Basic hair trim service', 150),
(3, 'Haircut Premium', 'Advanced hair cutting', 300),
(4, 'Hair Spa Deluxe', 'Deep conditioning hair spa', 600),
(5, 'Beard Shave', 'Quick beard shave', 120),
(6, 'Beard Style Premium', 'Premium beard styling', 350),
(7, 'Facial Classic', 'Classic facial treatment', 650),
(8, 'Facial Luxury', 'Luxury facial treatment', 1200),
(9, 'Hair Color Premium', 'Professional hair coloring', 1800),
(10, 'Hair Highlights', 'Hair highlights styling', 2000),
(11, 'Keratin Treatment', 'Keratin hair treatment', 3500),
(12, 'Oil Head Massage', 'Relaxing oil head massage', 350),
(13, 'Body Spa', 'Full body spa therapy', 4000),
(14, 'Body Massage', 'Luxury body massage', 2500),
(15, 'Express Manicure', 'Express manicure service', 250),
(16, 'Express Pedicure', 'Express pedicure service', 300),
(17, 'Full Arm Waxing', 'Full arm waxing treatment', 700),
(18, 'Full Leg Waxing', 'Full leg waxing treatment', 900),
(19, 'Eyebrow Shaping', 'Eyebrow shaping service', 120),
(20, 'Hair Wash', 'Hair wash and blow dry', 200),
(21, 'Party Hairstyle', 'Professional party hairstyle', 900);

INSERT INTO slot (id, date, time, booked, service_id) VALUES
(1, '2026-05-01', '10:00:00', false, 1),
(2, '2026-05-01', '11:00:00', false, 1),
(3, '2026-05-01', '12:00:00', false, 1),
(4, '2026-05-02', '10:00:00', false, 1),
(5, '2026-05-02', '11:00:00', false, 1),
(6, '2026-05-02', '12:00:00', true, 1),
(7, '2026-05-03', '10:00:00', false, 1),
(8, '2026-05-03', '11:00:00', false, 1),
(9, '2026-05-03', '12:00:00', false, 1),
(10, '2026-05-04', '10:00:00', false, 1);

INSERT INTO booking (id, user_id, slot_id, status, created_time) VALUES
(1, 1, 1, 'BOOKED', '2026-04-01 09:00:00'),
(2, 2, 6, 'BOOKED', '2026-04-02 10:00:00');

INSERT INTO payment (id, booking_id, amount, status) VALUES
(1, 2, 200.00, 'PAID');

SET FOREIGN_KEY_CHECKS = 1;
