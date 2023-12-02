const mongoose = require('mongoose');

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
  tests: [{
    type: String
  }],
  prescription: {
    type: String
  }
});

// Create a model using the schema
const Patient = mongoose.model('Tests', tests);

module.exports = Patient;
