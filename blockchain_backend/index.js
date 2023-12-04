// const express = require('express');
// const Reports = require('../server/Models/ReportUpload');
// const Web3 = require('web3');
// const { REPORTS_SIMP_STORAGE_ADDRESS, REPORTS_SIMP_STORAGE_ABI } = require('./Config/ReportsConfig');
import express from 'express';
import Report from './Models/ReportUpload.js';
import Web3 from 'web3';
import { REPORTS_SIMP_STORAGE_ADDRESS, REPORTS_SIMP_STORAGE_ABI } from './Config/ReportsConfig.js';
import mongoose from 'mongoose';
import db from './db/conn.js'
// import cors from 'cors'
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./Models/User');
// const Appointment = require('./Models/appointmentSchema');
// const Tests = require('./Models/tests');
// const Report = require('./Models/ReportUpload');
// const multer = require('multer');
// const mongoose = require('mongoose');






const app = express();
const port = 3002;

// app.use(cors());
// app.use(express.json());
// require('./db/conn')
// app.use(db)

app.get('/', (req, res) => {
  res.send('Hello from server');
});
// Assuming Ganache is running on the default port (http://127.0.0.1:7545)
const ganacheProvider = 'http://127.0.0.1:7545';

const web3 = new Web3(ganacheProvider);
const reportsContract = new web3.eth.Contract(REPORTS_SIMP_STORAGE_ABI, REPORTS_SIMP_STORAGE_ADDRESS);


// // Endpoint to store reports on the blockchain for a specific user
// app.get('/storeReports/:userId', async (req, res) => {
//   // console.log(reportsContract);

//   try {
//     const { userId } = req.params;
//     // console.log(userId)
//     // Fetch reports from MongoDB for the given userId
//     const userReports = await Report.find({ userId });
// // console.log(userReports)
//     if (!userReports || userReports.length === 0) {
//       return res.status(404).json({ error: 'No reports found for the user' });
//     }

//     console.log(userReports)
//     // Convert report data to the format expected by the smart contract
//     const reportsData = userReports.map((report) => ({
//       reportName: report.reportName,
//       reportFilePath: report.reportFile,
//       uploadedAt: report.uploadedAt,
//     }));
// console.log(reportsContract.methods)
//     // Call the smart contract function to store reports
//     await reportsContract.methods.uploadReport(userId, reportsData).send({ from: 'yourBlockchainAddress' });

//     res.status(200).json({ message: 'Reports stored on the blockchain successfully' });
//   } catch (error) {
//     console.error('Error storing reports on the blockchain:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Endpoint to store reports on the blockchain for a specific user
app.post('/storeReports/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      // Fetch reports from MongoDB for the given userId
      const userReports = await Report.find({ userId });

      if (!userReports || userReports.length === 0) {
          return res.status(404).json({ error: 'No reports found for the user' });
      }

      // Convert report data to the format expected by the smart contract
      const reportIds = userReports.map((report) => report._id.toString());
      const reportNames = userReports.map((report) => report.reportName);
      const reportFilePaths = userReports.map((report) => report.reportFile);

      console.log(reportIds, reportNames, reportFilePaths)
      console.log(reportsContract.methods)
      // Call the smart contract function to store reports
      await reportsContract.methods.uploadReports(reportIds, reportNames, reportFilePaths).send({ from: '0x1955FfCC638eC7d94B2497452a4d36a8142Ce568' });

      res.status(200).json({ message: 'Reports stored on the blockchain successfully' });
  } catch (error) {
      console.error('Error storing reports on the blockchain:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});


app.get('/userReports/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    // Ensure that the userId is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Example with Mongoose to find appointments by user ID
    const reports = await Report.find({ userId });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ error: 'Report not found for the user' });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});