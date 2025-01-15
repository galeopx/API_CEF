const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // Importer l'application configurée

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
