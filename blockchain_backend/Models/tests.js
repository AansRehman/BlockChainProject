// const mongoose = require('mongoose');
import mongoose from "mongoose";
// Define a schema for the patient
const tests = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
    required: true
  },
  tests: [{
    type: String
  }],
  prescription: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
});

// Create a model using the schema
const Patient = mongoose.model('Tests', tests);

// module.exports = Patient;
export default Patient;
