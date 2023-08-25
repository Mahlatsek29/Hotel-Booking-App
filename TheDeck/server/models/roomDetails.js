const mongoose = require('mongoose');
// const { default: RoomDetails } = require('../../client/src/pages/RoomDetails');

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



