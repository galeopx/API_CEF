const express = require('express'); 
const Catway = require('../models/Catway');

const router = express.Router();

// Route GEt to take all catways
router.get('/', async (req, res) => {
    try {
      const catways = await Catway.find();
      res.json(catways);  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Route POST to create a new catway
router.post('/', async (req, res) => {
    const { name, description } = req.body;
  
    const catway = new Catway({
      name,
      description,
    });
  
    try {
      const savedCatway = await catway.save();
      res.status(201).json(savedCatway);  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Route DELETE to delete a catway
router.delete('/:id', async (req, res) => {
    try {
      const catway = await Catway.findById(req.params.id);
      if (!catway) {
        return res.status(404).json({ message: 'Catway not found' });
      }
  
      await category.remove();  
      res.json({ message: 'Catway deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;