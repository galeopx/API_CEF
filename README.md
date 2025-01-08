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
- Mongoose (ORM pour MongoDB)
- JSON Web Tokens (JWT) pour l'authentification

### Frontend
- React.js (ou un autre framework au choix)

### Déploiement
- Heroku / Render / AWS (selon les préférences)

---

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url_du_dépôt>
   cd <nom_du_projet>
   ```

2. **Configurer l'environnement**
   - Créer un fichier `.env` avec les variables suivantes :
     ```env
     MONGO_URI=<url_de_la_base_de_données>
     JWT_SECRET=<clé_secrète_pour_les_tokens>
     PORT=3000
     ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```

4. **Importer les données initiales dans MongoDB**
   - Fichiers nécessaires : `catways.json` et `reservations.json`
   - Commandes :
     ```bash
     mongoimport --jsonArray --db <nom_de_la_bdd> --collection catways --file catways.json
     mongoimport --jsonArray --db <nom_de_la_bdd> --collection reservations --file reservations.json
     ```

5. **Lancer le serveur**
   ```bash
   npm start
   ```

---

## Utilisation

- **Accès API** : Les endpoints de l'API sont accessibles sur `http://localhost:3000`.
- **Frontend** : L'application web est disponible à la même adresse une fois déployée.

### Routes principales de l'API

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

---

## Déploiement

1. **Préparer l'environnement de production**
   - Configurer les variables d'environnement sur la plateforme de déploiement.

2. **Déployer l'application**
   - Suivre les instructions spécifiques à la plateforme choisie (Heroku, Render, AWS).

3. **Partager les liens**
   - Lien vers l'application déployée.
   - Identifiants de démonstration pour accéder au tableau de bord.

---

## Documentation

La documentation de l'API est disponible sur la page d'accueil ou via un outil comme Swagger ou Postman.

---

## Contributions
Les contributions sont les bienvenues. Créez une issue ou une pull request pour proposer des modifications.
