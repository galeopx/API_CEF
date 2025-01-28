const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const indexRoutes = require('./routes/indexRoutes');
const authentification = require('./routes/authentification');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();

// Déplacer les middlewares avant les routes
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  


// Routes ensuite
app.use('/', authentification);  // Préfixe pour les routes d'authentification
app.use('/dashboard', dashboardRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);
app.use('/', indexRoutes);  // Routes index en dernier

//gestionnaire 404
app.use((req, res) => {
    console.log('Route non trouvée:', req.url);
    res.status(404).send('Page non trouvée');
});

// Gestionnaire d'erreurs serveur
app.use((err, req, res, next) => {
    console.error('Erreur:', err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

module.exports = app;