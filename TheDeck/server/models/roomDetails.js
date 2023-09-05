const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  imageSrc: {
    type: String,
    // required: true
  },
  nightlyRate: {
    type: String,
    required: true
  }
});

const RoomDetails = mongoose.model('RoomDetails', roomSchema);

module.exports = RoomDetails;



