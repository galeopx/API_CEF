const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true, ref: 'Catway' }, //l'ID du catway reservé. ref: 'Catway' permet de lier la résa  un catway spécifique
    clientName: { type: String, required: true }, //nom du client qui a réservé
    boatName: { type: String, required: true }, //nom du bateau
    checkIn: { type: Date, required: true },    // Date du départ de la résa
    checkOut: { type: Date, required: true },   //date de fin de la résa
});

module.exports = mongoose.model('Reservation', reservationSchema);