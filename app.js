const express = require('express');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const indexRoutes = require('./routes/indexRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use(express.static('public'));

app.use(express.json());

// Création des routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);

// au cas où on a une erreur 404 ? c'est conventionnel
// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Ressource non trouvée' });
// });

// pour les potentiels erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

module.exports = app;
