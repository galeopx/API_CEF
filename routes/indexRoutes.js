const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {
        title: 'Accueil - Port de Plaisance',
        appDescription: 'Bienvenue dans l’application de gestion des catways et des réservations.',
        apiDocsLink: '/docs' 
    });
});

module.exports = router;
