const mongoose = require('mongoose');

const ReportUpload = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  reportFile: {
    type: String, // This can be the file path or any reference to the file in your storage system
    required: true,
  },
  // Add more fields if needed
});

const Report = mongoose.model('Report', ReportUpload);

module.exports = Report;
