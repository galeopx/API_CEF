const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérification simple des credentials
        if (email === 'admin@example.com' && password === 'password') {
            // Créer un token JWT
            const token = jwt.sign(
                { userId: 'admin' }, // pour le moment on met un ID fictif
                'ton_secret',
                { expiresIn: '24h' }
            );

            // Envoyer le token dans un cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });

            return res.status(200).json({ 
                success: true,
                message: 'Connexion réussie',
                redirectUrl: '/dashboard'
            });
        }

        return res.status(401).json({ 
            success: false,
            message: 'Identifiants incorrects'
        });

    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Erreur serveur'
        });
    }
});

module.exports = router;