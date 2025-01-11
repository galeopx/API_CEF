const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const catwayRoutes = require('./routes/catwayRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error(err));

app.use('/users', userRoutes);//Implémenter les routes user
app.use('/reservations', reservationRoutes);
app.use('/catways', catwayRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
