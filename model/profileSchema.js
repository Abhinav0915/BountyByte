const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    address: String,
    city: String,
    state: String,
    zip:Number
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile; 