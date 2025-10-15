/*1. `UPDATE`: Un étudiant a suivi un cours. Mettez à jour leur `final_grade` de `NULL` à `88.5`.*/
UPDATE enrôlements 
	set final_grade='88.5' 
		where final_grade is null and student_id=15;

/*2. `MISE À JOUR`: Un professeur quitte l'université. Réattribuer leurs cours à un autre professeur.*/
UPDATE cours 
	set professeur_id=7 
		where professeur_id=2
/*`DELETE`: Un étudiant a annulé son inscription dans un cours. Supprimer l'enregistrement correspondant dans la table `Enrôlements`.*/
DELETE from enrôlements 
	WHERE student_id=13 and course_id=5