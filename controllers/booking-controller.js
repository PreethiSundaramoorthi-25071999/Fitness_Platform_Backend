const Booking = require('../models/bookings');

// Get all bookings
const getallBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get booking by specific ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new booking
const addBooking = async (req, res) => {
  const { type, duration, capacity, availableSpots, imageUrl } = req.body;

  try {
    const newBooking = new Booking({ type, duration, capacity, availableSpots, imageUrl });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Error creating booking' });
  }
};

// Update booking spots
const updateBookingSpots = async (req, res) => {
  const { id } = req.params;
  const { availableSpots } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { availableSpots },
      { new: true }
    );
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Error updating booking' });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await Booking.findByIdAndDelete(id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting booking' });
  }
};

module.exports = {
  getallBookings,
  getBookingById,
  addBooking,
  updateBookingSpots,
  deleteBooking,
};
