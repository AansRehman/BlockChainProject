const mongoose = require('mongoose');

const ReportUpload = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  reportName:{
    type: String,
    required: true,
  },
  reportFile: {
    type: String, // This can be the file path or any reference to the file in your storage system
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Default value is the current date and time
  },
  // Add more fields if needed
});

const Report = mongoose.model('Report', ReportUpload);

module.exports = Report;
