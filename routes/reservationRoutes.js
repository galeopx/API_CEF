const express = require('express');
const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

const router = express.Router();

//route pour récupérer toutes les réservations 
router.get('/all', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ message: err.message });
    }
});

// GET lister toutes les réservations pour un catway 
router.get('/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations); // Retourner les réservations associées au catway
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// GET pour lister les détails d'une réservation
router.get('/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation || reservation.catwayNumber !== parseInt(req.params.id)) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.json(reservation); // Retourner les détails de la réservation
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST pour créer une réservation pour un catway 
router.post('/:id/reservations', async (req, res) => {
    const { clientName, boatName, checkIn, checkOut } = req.body;

    // Vérifier si le catway existe
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
        return res.status(400).json({ message: 'Catway invalide' });
    }

    const reservation = new Reservation({
        catwayNumber: req.params.id,
        clientName,
        boatName,
        checkIn,
        checkOut,
    });

    try {
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation); // Réservation créée avec succès
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT pour modifier une réservation
router.put('/:id/reservations/:idReservation', async (req, res) => {
    const { checkIn, checkOut } = req.body;

    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation || reservation.catwayNumber !== parseInt(req.params.id)) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        if (checkIn) reservation.checkIn = checkIn;
        if (checkOut) reservation.checkOut = checkOut;

        const updatedReservation = await reservation.save();
        res.json(updatedReservation); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// dDELETE pour supprimer une réservation
router.delete('/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation || reservation.catwayNumber !== parseInt(req.params.id)) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        await reservation.remove(); // Supprimer la réservation
        res.json({ message: 'Réservation annulée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;