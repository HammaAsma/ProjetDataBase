/*1. Liste de base: Liste tous les élèves triés par nom.*/
SELECT * FROM Étudiants 
	ORDER BY student_name ASC;
/*2. Recherche simple: Trouvez les détails d'un professeur spécifique par leur email.*/
SELECT * FROM `Professeurs` 
	WHERE professeur_email ='youssef.elidrissi@univ.ma'; 
/*3. Simple join (`INNER JOIN`): Liste tous les cours avec le nom du professeur qui l'enseigne.*/
SELECT c.Course_title, p.professor_name FROM `Cours` c
	INNER JOIN Professeurs p on c.professeur_id=p.professeur_id
	ORDER BY p.professor_name;
/*4. Multiple join: Liste tous les Étudiants inscrits au Cours «Introduction aux bases de données», montrant leur nom et leur courriel.*/
SELECT  e.student_name,e.student_email FROM Étudiants  e
	INNER JOIN Enrôlements en on e.student_id=en.student_id
    INNER JOIN Cours c on en.Course_id=c.Course_id
    WHERE c.Course_title='Introduction aux bases de données';
/*5. Multiple joint complexe: Afficher le nom de l'étudiant, le titre du Cours et le nom du professeur pour tous les inscriptions*/
SELECT e.student_name,c.Course_title,p.professor_name FROM Étudiants e 
	INNER JOIN Enrôlements en on e.student_id=en.student_id
    INNER JOIN Cours c on en.Course_id=c.Course_id
    INNER JOIN Professeurs p on c.professeur_id=p.professeur_id;
/*6. Analyse avec `JOINTE GAUCHE`: Identifier les Étudiants qui ne sont inscrits à aucun Cours*/
SELECT  e.*  FROM Étudiants e 
	LEFT JOIN Enrôlements en on e.student_id=en.student_id
    where en.student_id is null
/*7.  Analyse avec `JOINTE GAUCHE`: Identifier les professeurs qui n'enseignent actuellement aucun cours.*/ 
SELECT p.* FROM Professeurs p
	LEFT JOIN Cours c ON p.professeur_id = c.professeur_id
	WHERE c.professeur_id is null;
/*8. Agrégation avec `GROUPE BY` et `COMPTE`: Comptez le nombre d'étudiants inscrits à chaque cours.*/
SELECT  
	c.Course_title as 'Cours', 
	COUNT(en.student_id) as 'nomber étudiant'
FROM Cours c
	LEFT JOIN Enrôlements en ON c.Course_id = en.Course_id
	GROUP BY c.Course_title;
/*9.Agrégation avec `GROUPE BY` et `AVG`: Calculer la note finale moyenne pour chaque cours qui a au moins une note enregistrée*/
SELECT 
	c.course_title as 'cours',
	ROUND(AVG(en.final_grade),2) as 'note moyenne' 
FROM `enrôlements` en 
	INNER JOIN cours c on en.course_id=c.course_id 
	GROUP by c.course_title; 
/*10. Agrégation complexe avec `HAVING`: Liste des cours qui ont plus de 5 étudiants inscrits.	*/
SELECT 
	c.course_title as 'cours',
	count(en.student_id) as 'nb studient' 
  FROM `cours` c 
	INNER join enrôlements en on c.course_id=en.course_id
    GROUP BY c.course_title
    HAVING count(en.student_id)>5;
/*11. Agrégation avec `SUM` et `JOIN`: Calculer le nombre total de crédits dans lesquels chaque étudiant est inscrit*/
SELECT 
	e.student_name as 'Studiant', 
	sum(c.crédits) as 'crédits' 
FROM `étudiants` e 
	JOIN enrôlements en on e.student_id=en.student_id
    JOIN cours c on en.course_id=c.course_id
    GROUP by e.student_name;
/*12. Rapport final avec `ORDER BY` et `LIMIT`: Trouvez les 3 meilleurs cours avec la moyenne de notes la plus élevée.*/
SELECT 
	c.course_title as 'cours',
	ROUND(AVG(en.final_grade),2) as note_moyenne 
FROM `enrôlements` en 
	INNER JOIN cours c on en.course_id=c.course_id
    GROUP by c.course_title
    ORDER by note_moyenne desc
	limit 3;