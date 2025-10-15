
INSERT INTO departements (department_name, réalisateur) VALUES
('Informatique',     'Dr. Karim El Mansouri'),
('Mathématiques',    'Pr. Leila Haddad'),
('Physique',         'Dr. Rachid Amrani'),
('Génie Électrique', 'Dr. Salma Benjelloun');


INSERT INTO Professeurs (professor_name, professeur_email, département_id) VALUES
('Dr. Ahmed Laaroussi',    'ahmed.laaroussi@univ.ma',    1),
('Pr. Nadia Bennani',      'nadia.bennani@univ.ma',      1),
('Dr. Youssef El Idrissi', 'youssef.elidrissi@univ.ma',  2),
('Pr. Amina Zahra',        'amina.zahra@univ.ma',        2),
('Dr. Rachid Mouline',     'rachid.mouline@univ.ma',     3),
('Dr. Samira Chekri',      'samira.chekri@univ.ma',      3),
('Pr. Hicham Ouarzazi',    'hicham.ouarzazi@univ.ma',    4),
('Dr. Salma Benjelloun',   'salma.benjelloun@univ.ma',   4),
('Dr. Mehdi Farah',        'mehdi.farah@univ.ma',        1),
('Pr. Leila El Amrani',    'leila.elamrani@univ.ma',     2);


INSERT INTO Étudiants (student_name, student_email, university_enrollment_date) VALUES
('Ait Larbi Youssef',   'y.aitlarbi@univ.ma',   '2022-09-15'),
('El Idrissi Sara',     's.elidrissi@univ.ma',  '2023-09-10'),
('Ben Jelloun Omar',    'o.benjelloun@univ.ma', '2022-09-12'),
('Jaziri Imane',        'i.jaziri@univ.ma',     '2023-09-11'),
('Naji Karim',          'k.naji@univ.ma',       '2021-09-20'),
('Bouhnik Lina',        'l.bouhnik@univ.ma',    '2022-09-01'),
('Cherkaoui Rami',      'r.cherkaoui@univ.ma',  '2023-02-14'),
('Saidi Meriem',        'm.saidi@univ.ma',      '2022-09-03'),
('Fassi Adil',          'a.fassi@univ.ma',      '2021-09-18'),
('El Khatib Nora',      'n.elkhatib@univ.ma',   '2023-09-10'),
('Berrada Sami',        's.berrada@univ.ma',    '2022-09-05'),
('Rifi Yasmina',        'y.rifi@univ.ma',       '2023-01-10'),
('Ouhammou Taha',       't.ouhammou@univ.ma',   '2021-09-25'),
('Lahlou Wafa',         'w.lahlou@univ.ma',     '2022-09-09'),
('Mahmoud Ilyas',       'i.mahmoud@univ.ma',    '2021-09-12'),
('Ezzoubi Salma',       's.ezzoubi@univ.ma',    '2023-09-11'),
('Rami Anas',           'a.rami@univ.ma',       '2022-09-06'),
('Amakhmouj Hanan',     'h.amakhmouj@univ.ma',  '2022-09-15'),
('Bennis Rita',         'r.bennis@univ.ma',     '2023-09-02'),
('Tazi Oumaima',        'o.tazi@univ.ma',       '2021-09-20'),
('Khattabi Nabil',      'n.khattabi@univ.ma',   '2022-09-04'),
('El Idrissi Mouna',    'm.elidrissi@univ.ma',  '2023-09-10'),
('Zahiri Walid',        'w.zahiri@univ.ma',     '2021-09-01'),
('Hammou Dounia',       'd.hammou@univ.ma',     '2022-09-07'),
('Mansouri Yassin',     'y.mansouri@univ.ma',   '2023-09-11'),
('Kabbaj Aya',          'a.kabbaj@univ.ma',     '2022-09-08'),
('Slaoui Hicham',       'h.slaoui@univ.ma',     '2021-09-10'),
('Naoui Selma',         's.naoui@univ.ma',      '2023-09-12'),
('Chraibi Rayan',       'r.chraibi@univ.ma',    '2024-02-01'),  
('Oulad Lamia',         'l.oulad@univ.ma',      '2024-02-01');  


INSERT INTO Cours (course_title, crédits, professeur_id, département_id) VALUES
('Introduction à la Programmation',        4, 1, 1),
('Structures de Données',                  4, 2, 1),
('Bases de Données',                       3, 9, 1),
('Systèmes d''Exploitation',               3, 1, 1),
('Réseaux Informatiques',                  3, 9, 1),
('Calcul I',                               4, 3, 2),
('Probabilités & Statistiques',            3, 4, 2),
('Algèbre Linéaire',                       3,10, 2),
('Mécanique Générale',                     4, 5, 3),
('Physique Quantique',                     3, 5, 3),
('Optique & Ondes',                        3, 6, 3),
('Circuits Électriques I',                 4, 7, 4),
('Systèmes Électriques',                   3, 8, 4),
('Signaux et Systèmes',                    3, 8, 4),
('Projet de Fin d''Études (PFE)',          6, 1, 1);

INSERT INTO Enrôlements (student_id, course_id, course_enrollment_date, final_grade) VALUES
-- Student 1 (5 cours)
(1, 1, '2025-09-01 08:00:00', NULL),
(1, 2, '2025-09-01 08:05:00', NULL),
(1, 3, '2025-09-01 08:10:00', NULL),
(1, 4, '2025-09-01 08:15:00', 15.50),
(1,15, '2025-09-01 08:20:00', NULL),

-- Student 2 (3)
(2, 1, '2025-09-01 09:00:00', 14.00),
(2, 2, '2025-09-01 09:05:00', NULL),
(2, 6, '2025-09-01 09:10:00', NULL),

-- Student 3 (3)
(3, 1, '2025-09-02 10:00:00', NULL),
(3, 3, '2025-09-02 10:05:00', 12.50),
(3, 5, '2025-09-02 10:10:00', NULL),

-- Student 4 (2)
(4, 2, '2025-09-02 11:00:00', NULL),
(4, 7, '2025-09-02 11:05:00', NULL),

-- Student 5 (4)
(5, 1, '2025-09-03 08:00:00', 13.00),
(5, 2, '2025-09-03 08:05:00', NULL),
(5, 3, '2025-09-03 08:10:00', 16.00),
(5, 6, '2025-09-03 08:15:00', NULL),

-- Student 6 (2)
(6, 2, '2025-09-03 09:00:00', NULL),
(6, 8, '2025-09-03 09:05:00', NULL),

-- Student 7 (3)
(7, 3, '2025-09-03 10:00:00', NULL),
(7, 4, '2025-09-03 10:05:00', NULL),
(7, 9, '2025-09-03 10:10:00', NULL),

-- Student 8 (3)
(8, 1, '2025-09-04 08:00:00', NULL),
(8,10, '2025-09-04 08:05:00', NULL),
(8,11, '2025-09-04 08:10:00', 12.00),

-- Student 9 (4)
(9, 1, '2025-09-04 09:00:00', NULL),
(9, 2, '2025-09-04 09:05:00', NULL),
(9, 3, '2025-09-04 09:10:00', NULL),
(9, 6, '2025-09-04 09:15:00', NULL),

-- Student 10 (3)
(10, 6, '2025-09-04 10:00:00', NULL),
(10, 7, '2025-09-04 10:05:00', NULL),
(10, 8, '2025-09-04 10:10:00', NULL),

-- Student 11 (3)
(11, 9, '2025-09-05 08:00:00', NULL),
(11,10, '2025-09-05 08:05:00', NULL),
(11,12, '2025-09-05 08:10:00', NULL),

-- Student 12 (3)
(12,12, '2025-09-05 09:00:00', NULL),
(12,13, '2025-09-05 09:05:00', NULL),
(12,14, '2025-09-05 09:10:00', NULL),

-- Student 13 (3)
(13, 4, '2025-09-06 08:00:00', NULL),
(13, 5, '2025-09-06 08:05:00', NULL),
(13,15, '2025-09-06 08:10:00', NULL),

-- Student 14 (2)
(14,11, '2025-09-06 09:00:00', NULL),
(14,13, '2025-09-06 09:05:00', NULL),

-- Student 15 (3)
(15, 9, '2025-09-06 10:00:00', NULL),
(15,12, '2025-09-06 10:05:00', NULL),
(15,14, '2025-09-06 10:10:00', NULL),

-- Student 16 (3)
(16, 1, '2025-09-07 08:00:00', NULL),
(16, 3, '2025-09-07 08:05:00', NULL),
(16,15, '2025-09-07 08:10:00', NULL),

-- Student 17 (3)
(17, 2, '2025-09-07 09:00:00', NULL),
(17, 4, '2025-09-07 09:05:00', NULL),
(17, 5, '2025-09-07 09:10:00', NULL),

-- Student 18 (2)
(18, 6, '2025-09-08 08:00:00', NULL),
(18, 7, '2025-09-08 08:05:00', NULL),

-- Student 19 (4)
(19, 8, '2025-09-08 09:00:00', NULL),
(19, 9, '2025-09-08 09:05:00', NULL),
(19,10, '2025-09-08 09:10:00', NULL),
(19,11, '2025-09-08 09:15:00', NULL),

-- Student 20 (3)
(20, 1, '2025-09-09 08:00:00', NULL),
(20, 2, '2025-09-09 08:05:00', NULL),
(20, 3, '2025-09-09 08:10:00', NULL),

-- Student 21 (3)
(21, 4, '2025-09-09 09:00:00', NULL),
(21, 5, '2025-09-09 09:05:00', NULL),
(21, 6, '2025-09-09 09:10:00', NULL),

-- Student 22 (3)
(22, 7, '2025-09-10 08:00:00', NULL),
(22, 8, '2025-09-10 08:05:00', NULL),
(22,15, '2025-09-10 08:10:00', NULL),

-- Student 23 (2)
(23, 1, '2025-09-10 09:00:00', NULL),
(23, 2, '2025-09-10 09:05:00', NULL),

-- Student 24 (3)
(24, 3, '2025-09-10 10:00:00', NULL),
(24, 4, '2025-09-10 10:05:00', NULL),
(24, 5, '2025-09-10 10:10:00', NULL),

-- Student 25 (3)
(25, 6, '2025-09-11 08:00:00', NULL),
(25, 7, '2025-09-11 08:05:00', NULL),
(25, 8, '2025-09-11 08:10:00', NULL),

-- Student 26 (3)
(26, 9, '2025-09-11 09:00:00', NULL),
(26,10, '2025-09-11 09:05:00', NULL),
(26,11, '2025-09-11 09:10:00', NULL),

-- Student 27 (3)
(27,12, '2025-09-12 08:00:00', NULL),
(27,13, '2025-09-12 08:05:00', NULL),
(27,14, '2025-09-12 08:10:00', NULL),

-- Student 28 (3)
(28, 1, '2025-09-12 09:00:00', NULL),
(28, 2, '2025-09-12 09:05:00', NULL),
(28,15, '2025-09-12 09:10:00', NULL);


