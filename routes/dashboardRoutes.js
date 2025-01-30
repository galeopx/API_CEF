const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId); // Récupérer l'utilisateur depuis MongoDB

        if (!user) {
            return res.redirect('/');
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Erreur auth:', error);
        res.redirect('/');
    }
};

router.get('/', auth, (req, res) => {
    try {
        res.render('dashboard', {
            user: { name: req.user.name, email: req.user.email },
            reservations: []
        });
    } catch (error) {
        console.error('Erreur rendu:', error);
        res.status(500).send('Erreur serveur');
    }
});
// Creation d'une route pour se déconnecter
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Supprime le cookie du token
    res.redirect('/'); // Redirige vers la page d'accueil ou de connexion
});

// Connecion à la page catway
router.get('/catways', auth, (req, res) => {
    res.render('catways');
});
//connexion à la page reservation
router.get('/reservations', auth, (req, res) => {
    res.render('reservations');
});
//connexion à la page users
router.get('/users', auth, (req, res) => {
    res.render('users');
});
module.exports = router;