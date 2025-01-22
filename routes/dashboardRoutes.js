const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error('Pas de token');
        jwt.verify(token, 'ton_secret');
        next();
    } catch {
        res.redirect('/');
    }
};

router.get('/', auth, (req, res) => {
    res.render('dashboard', {
        user: { name: 'Admin', email: 'admin@example.com' },
        reservations: []
    });
});

module.exports = router;