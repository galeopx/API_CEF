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
router.put('/', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not Found"});
        }
        user.name = req.body.name || user.name; //Verifie si la veleur name existe, si elle existe pas il y aura pas de modification. Sinon il sera mi a jour
        user.email = req.body.email || user.email; //Verifie si la valeur email existe, si elle existe pas il y aura pas de modification. sinon il sere mi a jour
        user.password = req.body.password || user.password; //Verifie si la valeur password existe, si elle existe pas il y aura pas de modification. sinon il sera mit a jour

        const updateUser = await user.save();
        res.json(updateUser);
    } catch (err){
        res.status(400).json({message:err.message});
    }
});

// utilisation de la méthode HTTP DELETE pour supprimer un utilisateur
router.delete('/', async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not Found"});
        }
        await user.remove();
        res.json({message: 'User deleted'});
    } catch (err){
        res.status(500).json({ message: err.message});
    }
});

module.exports = router;