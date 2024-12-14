// const bookingSchema = new mongoose.Schema({
//     type: { type: String, required: true },
//     duration: { type: String, required: true },
//     capacity: { type: Number, required: true },
//     availableSpots: { type: Number, required: true },
//   });

// const Booking = mongoose.model('Booking', bookingSchema);


//new
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  duration: { type: String, required: true },
  capacity: { type: Number, required: true },
  availableSpots: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Classes', BookingSchema);