/*creation de data*/
create database universite;
use universitaire;
/*creation des tables*/
create table Departements(
	département_id int primary key AUTO_INCREMENT,
	department_name varchar(150) not null UNIQUE,
	réalisateur varchar(100)	
);
create table Professeurs(
	professeur_id int primary key AUTO_INCREMENT,
	professor_name varchar(100) not null,
	professeur_email varchar(100) not null UNIQUE,
	département_id int ,
	FOREIGN KEY (département_id) REFERENCES departements(département_id)
	on delete cascade
);
create table Étudiants(
	student_id int primary key AUTO_INCREMENT,
	student_name varchar(100) not null,
	student_email varchar(100) not null UNIQUE,
	university_enrollment_date date not null
);
create table Cours(
	course_id int primary key AUTO_INCREMENT,
	course_title varchar(200) not null,
	crédits int not null check (crédits>0),
	professeur_id int,
	département_id int,
	FOREIGN key (professeur_id) REFERENCES Professeurs (professeur_id)
	on delete cascade,
	FOREIGN key (département_id) REFERENCES departements (département_id)
	on delete cascade
);
create table Enrôlements(
	enrollment_id int primary key AUTO_INCREMENT,
	student_id int,
	course_id int,
	course_enrollment_date TIMESTAMP default CURRENT_TIMESTAMP,
	final_grade decimal(5,2) null,
	FOREIGN key (student_id) REFERENCES Étudiants(student_id) on delete cascade,
	FOREIGN key (course_id) REFERENCES Cours(course_id) on delete cascade
)