const mongoose = require('mongoose');
 //On va utiliser la classe .Schema pour donner des règles aux éléments
const userSchema = new mongoose.Schema({
    usrname: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlenght: 6}, //on définie à 6 le nombre de caractère minimale pour le mdp
});

module.exports = mongoose.model('User', userSchema)
//onn utilise module.exports pour paratger les fonctionnalités du model User
//mongoose.model('User', userSchema) create a class for users collection in MongoDB