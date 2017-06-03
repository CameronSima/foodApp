var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    volunteer: Boolean
});

module.exports = mongoose.model('User', UserSchema);