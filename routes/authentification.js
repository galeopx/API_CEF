const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === 'admin@example.com' && password === 'password') {
            const token = jwt.sign(
                { userId: 'admin' },
                'ton_secret',
                { expiresIn: '24h' }
            );

            // Définir le cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            // Renvoyer un succès
            res.status(200).json({ success: true });
        } else {
            res.status(401).send('Email ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;