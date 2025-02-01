const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Importer l'application configurée

// Charger les variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 3000;

// Configurer la connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('MongoDB connecté avec succès');
  
  // Démarrer le serveur uniquement après la connexion à MongoDB
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });
})
.catch(err => {
  console.error('Erreur de connexion à MongoDB:', err);
  // Arrêter le processus en cas d'échec de connexion
  process.exit(1);
});