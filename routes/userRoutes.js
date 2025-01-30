const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Pour créer des tokens

const router = express.Router();

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Recherche de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Création du token JWT
        const token = jwt.sign(
            { userId: user._id },
            'ton_secret', // À remplacer par une vraie clé secrète stockée dans vos variables d'environnement
            { expiresIn: '24h' }
        );

        res.json({
            token,
            userId: user._id,
            message: 'Connexion réussie'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route de création d'un utilisateur (inscription)
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hachage du mot de passe 
        const hashedPassword = await bcrypt.hash(password, 10);
        // 
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const newUser = await user.save();
        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            userId: newUser._id
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware d'authentification 
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentification requise' });
    }
}; 

router.get('/', async (req, res) => {  
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Erreur dans GET /users:', err);
        res.status(500).json({ message: err.message });
    }
});

// Route pour obtenir tous les utilisateurs
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error('Erreur dans GET /users:', err);
        res.status(500).json({ message: err.message });
    }
});
router.put('/:email', async (req, res) => {  
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save();
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (err) {
        console.error('Erreur modification utilisateur:', err);
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:email', async (req, res) => {  // Retiré auth
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await User.deleteOne({ email: req.params.email });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        console.error('Erreur suppression utilisateur:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;