const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log('Erreur auth:', error);
        res.redirect('/');
    }
};

router.get('/', auth, (req, res) => {
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