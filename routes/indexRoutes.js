const express = require('express');
const router = express.Router();

//s'entrainer au .get 
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Accueil - Port de Plaisance',
        appDescription: 'Bienvenue dans l’application de gestion des catways et des réservations.',
    });
});

module.exports = router;
