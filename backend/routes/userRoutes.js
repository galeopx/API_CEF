const express = require('express');
const User = require('../models/User'); // on utilise le model créé

const router = express.Router();

//Utilisation de la methode HTTP GET pour réccupérer les infos du serveur
router.get('/', async (res, req) =>{
    try {                                       //Try et catch au cas où il y a une erreur dans la récupérations 
        const users = await User.find(); 
        res.json(users);
    } catch (err){
        res.statusCode(500).json({message: "ERROR", error: err.message});
    }
});
//.get /:email qui récupère les détails d'un user par email
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Retourner les détails de l'utilisateur
    } catch (err) {
        res.status(500).json({ message: "ERROR", error: err.message });
    }
});

//Utilisation de la méthode HTTP POST pour créer un nouvel utilisateur
router.post('/', async(req, res) => {
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err){
        res.status(400).json({ message: err.message});
    }
});

//Utilisation de la méthode HTTP PUT pour mettre à jour l'utilisateur
router.put('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.json(updatedUser); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// utilisation de la méthode HTTP DELETE pour supprimer un utilisateur
router.delete('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove(); 
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// router.post pour gérer la connexion user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { // Authentification basique (à remplacer par un système sécurisé)
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//.get /logout pour la déconnexion
router.get('/logout', (req, res) => {
    // Exemple simple de déconnexion
    res.json({ message: 'Logout successful' });
});

module.exports = router;