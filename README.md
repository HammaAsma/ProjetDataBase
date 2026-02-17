# Documentation technique — Projet final bases de données

Ce document décrit l’architecture, les modèles de données et les fonctionnalités des deux projets du dépôt **ProjetFinalDataBase** : un système de gestion universitaire (MySQL) et un backend de gestion de restaurant (MongoDB).

---

## 1. Vue d’ensemble

| Projet | Technologie | Domaine |
|--------|-------------|---------|
| **Projet 1** | MySQL (relationnel) | Système de gestion universitaire |
| **Projet 3** | MongoDB (NoSQL) | Backend système de gestion de restaurant |

---

## 2. Projet 1 — Système de gestion universitaire (MySQL)

### 2.1 Objectif

Modéliser et interroger une base de données relationnelle pour une université : départements, professeurs, étudiants, cours et inscriptions.

### 2.2 Schéma de la base

- **Base** : `universite` (script : `use universitaire` — à harmoniser avec le nom de la base).
- **Tables** :
  - **Departements** : `département_id` (PK), `department_name`, `réalisateur`
  - **Professeurs** : `professeur_id` (PK), `professor_name`, `professeur_email`, `département_id` (FK → Departements)
  - **Étudiants** : `student_id` (PK), `student_name`, `student_email`, `university_enrollment_date`
  - **Cours** : `course_id` (PK), `course_title`, `crédits`, `professeur_id` (FK), `département_id` (FK)
  - **Enrôlements** : `enrollment_id` (PK), `student_id` (FK), `course_id` (FK), `course_enrollment_date`, `final_grade`

Contraintes : clés étrangères avec `ON DELETE CASCADE`, `crédits > 0`, emails uniques.

### 2.3 Fichiers du projet

| Fichier | Rôle |
|---------|------|
| `MySQL/Projet1__SystèmeDeGestionUniversitaire/shema.sql` | Création de la base et des tables |
| `MySQL/Projet1__SystèmeDeGestionUniversitaire/data.sql` | Données de référence (départements, professeurs, étudiants, cours, enrôlements) |
| `MySQL/Projet1__SystèmeDeGestionUniversitaire/queries.sql` | Requêtes de lecture (SELECT, JOIN, agrégations) |
| `MySQL/Projet1__SystèmeDeGestionUniversitaire/modifications.sql` | Exemples UPDATE et DELETE |

### 2.4 Requêtes principales (queries.sql)

- Liste des étudiants triés par nom.
- Recherche d’un professeur par email.
- Cours avec nom du professeur (INNER JOIN).
- Étudiants inscrits à un cours donné (multi-JOIN).
- Inscriptions avec étudiant, cours et professeur (jointure complète).
- Étudiants sans inscription (LEFT JOIN + `IS NULL`).
- Professeurs sans cours (LEFT JOIN + `IS NULL`).
- Nombre d’étudiants par cours (GROUP BY, COUNT).
- Note moyenne par cours (GROUP BY, AVG).
- Cours avec plus de 5 inscrits (HAVING).
- Total de crédits par étudiant (SUM, JOIN).
- Top 3 cours par note moyenne (ORDER BY, LIMIT).

### 2.5 Modifications (modifications.sql)

- Mise à jour d’une `final_grade` (NULL → 88.5) pour un enrôlement donné.
- Réattribution des cours d’un professeur à un autre (UPDATE sur `professeur_id`).
- Suppression d’une inscription (DELETE dans `Enrôlements`).

---

## 3. Projet 3 — Backend système de gestion de restaurant (MongoDB)

### 3.1 Objectif

Fournir un jeu de collections MongoDB et des scripts (setup, données, requêtes, mises à jour) pour un système de gestion de restaurant : fournisseurs, ingrédients, carte, clients et commandes.

### 3.2 Modèle de données (collections)

| Collection | Description | Champs principaux |
|------------|-------------|-------------------|
| **suppliers** | Fournisseurs | `supplier_name`, `contact_email`, `phone`, `address` |
| **ingredients** | Ingrédients | `ingredient_name`, `stock_kg`, `unit`, `supplier_id`, `cost_per_kg` |
| **menu_items** | Articles de la carte | `item_name`, `description`, `price`, `tags`, `cost_estimate`, `available` |
| **customers** | Clients | `customer_name`, `email`, `phone`, `loyalty_points`, `created_at` |
| **orders** | Commandes | `customer_id`, `table_number`, `order_type`, `order_date`, `status`, `payment_method`, `total_amount`, `line_items[]` |

`line_items` : tableau de `{ item_id, item_name, quantity, unit_price, subtotal }`.

Statuts de commande : `Pending`, `In Progress`, `Completed`, `Paid`, `Canceled`.

### 3.3 Fichiers du projet

| Fichier | Rôle |
|---------|------|
| `NoSQL/Projet3__BackendPourLeSystèmeDeGestionDeRestaurant/setup.js` | Création et peuplement des collections de référence (suppliers, ingredients, menu_items, customers) |
| `NoSQL/Projet3__BackendPourLeSystèmeDeGestionDeRestaurant/data.js` | Génération et insertion de 500 commandes (orders) |
| `NoSQL/Projet3__BackendPourLeSystèmeDeGestionDeRestaurant/queries.js` | Requêtes et agrégations (find, aggregate, $lookup, $group, etc.) |
| `NoSQL/Projet3__BackendPourLeSystèmeDeGestionDeRestaurant/modifications.js` | Exemples de mises à jour (updateOne, updateMany) |

### 3.4 Ordre d’exécution recommandé

1. `load('setup.js')` — créer et remplir fournisseurs, ingrédients, menu, clients.
2. `load('data.js')` — générer et insérer les commandes.
3. Exécuter les requêtes et agrégations dans `queries.js` (décommenter au besoin).
4. Exécuter les modifications dans `modifications.js` (décommenter au besoin).

### 3.5 Requêtes et agrégations (queries.js)

- Commandes du jour (filtre sur `order_date`).
- Détail d’un article par `item_name`.
- Ingrédients avec nom du fournisseur (`$lookup` sur `suppliers`).
- Articles avec tag `Vegetarian`.
- Commandes d’un client donné, triées par date.
- Clients sans commande (`$lookup` + `$match` sur tableau vide).
- Fournisseurs sans ingrédient référencé (`$lookup` + `$match`).
- Nombre d’ingrédients par fournisseur (`$group`, `$lookup`).
- Nombre de ventes et chiffre d’affaires par plat (`$unwind` line_items, `$group`).
- Clients avec plus de 5 commandes (`$group`, `$match`, `$lookup`).
- Chiffre d’affaires par jour (`$dateToString`, `$group`, `$sum`).
- Top 5 plats les plus rentables (`$unwind`, `$group`, `$sort`, `$limit`).

### 3.6 Modifications (modifications.js)

- Ajout d’un tag à un plat (`$push` sur `menu_items`).
- Mise à jour du prix d’un plat (`$set`).
- Passage en `Canceled` des commandes « In Progress » de plus d’une heure (`updateMany`).

---

## 4. Technologies et outils

- **MySQL** : schéma SQL, requêtes SELECT/UPDATE/DELETE, jointures, agrégations (COUNT, AVG, SUM), HAVING, ORDER BY, LIMIT.
- **MongoDB** : shell (mongosh), insertMany, find, updateOne/updateMany, aggregate avec $lookup, $unwind, $group, $match, $project, $sort, $limit.

---

## 5. Structure du dépôt

```
ProjetFinalDataBase/
├── DOCUMENTATION_TECHNIQUE.md   (ce fichier)
├── MySQL/
│   └── Projet1__SystèmeDeGestionUniversitaire/
│       ├── shema.sql
│       ├── data.sql
│       ├── queries.sql
│       └── modifications.sql
└── NoSQL/
    └── Projet3__BackendPourLeSystèmeDeGestionDeRestaurant/
        ├── setup.js
        ├── data.js
        ├── queries.js
        └── modifications.js
```

---

*Document généré pour le projet final bases de données — Formation Full Stack.*
