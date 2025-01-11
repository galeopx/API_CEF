# Gestion des Catways pour le Port de Plaisance Russell

## Description
Ce projet consiste à développer une application web et une API privée pour la gestion des réservations des catways (petits appontements pour amarrer des bateaux) du port de plaisance Russell. L'application permet de gérer les utilisateurs, les catways et les réservations via des fonctionnalités CRUD (Create, Read, Update, Delete).

---

## Fonctionnalités principales

### API Backend
- **Gestion des utilisateurs** :
  - Créer, modifier, supprimer et lister les utilisateurs.
  - Authentification avec système de connexion et déconnexion.

- **Gestion des catways** :

  - Créer, modifier, supprimer et lister les catways.
  - Visualiser les détails d'un catway spécifique.

- **Gestion des réservations** :
  - Créer, modifier, supprimer et lister les réservations.
  - Associer les réservations à un catway spécifique.

### Frontend
- Page d'accueil avec connexion utilisateur et lien vers la documentation.
- Tableau de bord pour visualiser les données utilisateur et les réservations en cours.
- Interface graphique pour gérer les utilisateurs, catways et réservations (CRUD).

---

## Technologies utilisées

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Frontend
- React.js
- Bootstrap

## Routes principales de l'API

#### Utilisateurs
- `POST /users` : Créer un utilisateur
- `GET /users` : Lister les utilisateurs
- `GET /users/:email` : Récupérer un utilisateur par email
- `PUT /users/:email` : Modifier un utilisateur
- `DELETE /users/:email` : Supprimer un utilisateur
- `POST /login` : Se connecter
- `GET /logout` : Se déconnecter

#### Catways
- `GET /catways` : Lister les catways
- `GET /catways/:id` : Récupérer les détails d'un catway
- `POST /catways` : Créer un catway
- `PUT /catways/:id` : Modifier un catway
- `DELETE /catways/:id` : Supprimer un catway

#### Réservations
- `GET /catways/:id/reservations` : Lister les réservations d'un catway
- `GET /catways/:id/reservations/:idReservation` : Récupérer les détails d'une réservation
- `POST /catways/:id/reservations` : Créer une réservation
- `PUT /catways/:id/reservations` : Modifier une réservation
- `DELETE /catways/:id/reservations/:idReservation` : Supprimer une réservation


## Contributions
Les contributions sont les bienvenues. Créez une issue ou une pull request pour proposer des modifications.
