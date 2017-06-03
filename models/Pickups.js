var mongoose = require('mongoose');

var PickupSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    donor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    volunteer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    location: { lat: Number,
                lng: Number },
    status: { type: String, default: "Not accepted"},
    amount: String,
    perishable: Boolean,
    message: String
});

module.exports = mongoose.model('Pickup', PickupSchema);