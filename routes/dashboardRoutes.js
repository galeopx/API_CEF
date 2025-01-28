const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        console.log('Cookies reçus:', req.cookies);
        const token = req.cookies.token;
        
        if (!token) {
            console.log('Pas de token');
            return res.redirect('/');
        }

        const decoded = jwt.verify(token, 'ton_secret');
        console.log('Token vérifié:', decoded);
        next();
    } catch (error) {
        console.log('Erreur auth:', error);
        res.redirect('/');
    }
};

router.get('/', auth, (req, res) => {
    console.log('Rendu du dashboard');
    try {
        res.render('dashboard', {
            user: { name: 'Admin', email: 'admin@example.com' },
            reservations: []
        });
    } catch (error) {
        console.error('Erreur rendu:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;