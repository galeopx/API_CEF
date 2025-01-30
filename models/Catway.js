const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber : { 
        type: Number, 
        required: true, 
        unique: true
    },
    type : { 
        type: String,
        required: true, 
        enum: ['long', 'short']
    },
    catwayState : { 
        type: String, 
        required: true
    }
}, { collection: 'catways' }); 


module.exports = mongoose.model('Catway', catwaySchema);