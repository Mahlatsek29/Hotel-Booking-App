const mongoose = require('mongoose');

const adminDataSchema = new mongoose.Schema({
    id: String,
    name: String,
    roomName: String,
    numGuests: Number,
    checkIn: Date,
    checkOut: Date,
    totalAmount: Number
});

const AdminData = mongoose.model('AdminData', adminDataSchema);

module.exports = AdminData;
