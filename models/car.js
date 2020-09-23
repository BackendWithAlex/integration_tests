const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    available_quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Car', CarSchema);