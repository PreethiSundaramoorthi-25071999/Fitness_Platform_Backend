const express = require('express');
const {
  getallBookings,
  getBookingById,
  addBooking,
  updateBookingSpots,
  deleteBooking,
} = require('../controllers/booking-controller');

const router = express.Router();

// Routes
router.get('/', getallBookings);
router.get('/:id', getBookingById );
router.post('/add', addBooking);
router.put('/:id', updateBookingSpots);
router.delete('/:id', deleteBooking);

module.exports = router;
