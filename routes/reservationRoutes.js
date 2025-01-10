const express = require('express');
const Reservation = require('../models/Reservation'); // Importer le modèle Reservation
const User = require('../models/User');
const Catway = require('../models/Catway');

const router = express.Router();

//.get pour récupérer toutes les réservations
router.get('/', async (req, res) => {
    try {
      const reservations = await Reservation.find().populate('userId categoryId');
      res.json(reservations);  // Retourner toutes les réservations avec les informations de l'utilisateur et de la catégorie
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Route POST pour créer une réservation
router.post('/', async (req, res) => {
    const { userId, date, categoryId } = req.body;
  
    // Vérifier si l'utilisateur et la catégorie existent
    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);
  
    if (!user || !category) {
      return res.status(400).json({ message: 'Utilisateur ou catégorie invalide' });
    }
  
    const reservation = new Reservation({
      userId,
      date,
      categoryId,
    });
    try {
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);  // Réservation créée avec succès
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

// Route dDELETE pour supprimer les reservations

router.delete('/:id', async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: 'Réservation non trouvée' });
      }
  
      await reservation.remove();  // Supprimer la réservation
      res.json({ message: 'Réservation annulée' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
module.exports = router;