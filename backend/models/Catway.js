const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber : { type: Number, required: true, unique: true,}, //identifiant unique
    type : { type: String,required: true, enum: ['long', 'short']}, //le type peut être que 'long' ou 'short' 
    catwayState : { type: String, required: true}, //State of catway
});

module.exports = mongoose.model('Catway', catwaySchema); //to export fonctionnality