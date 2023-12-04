const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
