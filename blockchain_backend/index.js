// const express = require('express');
// const Reports = require('../server/Models/ReportUpload');
// const Web3 = require('web3');
// const { REPORTS_SIMP_STORAGE_ADDRESS, REPORTS_SIMP_STORAGE_ABI } = require('./Config/ReportsConfig');
import express from 'express';
import Report from './Models/ReportUpload.js';
import tests from './Models/tests.js'
import users from './Models/User.js'
import Web3 from 'web3';
import { REPORTS_SIMP_STORAGE_ADDRESS, REPORTS_SIMP_STORAGE_ABI } from './Config/ReportsConfig.js';
import { USERS_SIMP_STORAGE_ADDRESS, USERS_SIMP_STORAGE_ABI } from './Config/UsersConfig.js';
import { TESTS_SIMP_STORAGE_ADDRESS, TESTS_SIMP_STORAGE_ABI } from './Config/TestsConfig.js';
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
const userContract = new web3.eth.Contract(USERS_SIMP_STORAGE_ABI, USERS_SIMP_STORAGE_ADDRESS);
const testsContract = new web3.eth.Contract(TESTS_SIMP_STORAGE_ABI, TESTS_SIMP_STORAGE_ADDRESS);

// // Endpoint to store reports on the blockchain for a specific user
// app.post('/storeReports/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Fetch reports from MongoDB for the given userId
//     const userReports = await Report.find({ userId });

//     if (!userReports || userReports.length === 0) {
//       return res.status(404).json({ error: 'No reports found for the user' });
//     }

//     // Convert report data to the format expected by the smart contract
//     const reportIds = userReports.map((report) => parseInt(report._id)); // Convert MongoDB _id to integer
//     const reportNames = userReports.map((report) => report.reportName);
//     const reportFilePaths = userReports.map((report) => report.reportFile);

//     console.log(reportIds, reportNames, reportFilePaths)
//     console.log(reportsContract.methods)
//     // Call the smart contract function to store reports
//     await reportsContract.methods.uploadReports(reportIds, reportNames, reportFilePaths).send({ from: '0x1955FfCC638eC7d94B2497452a4d36a8142Ce568' });

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
    const reportsData = userReports.map((report) => ({
      // _reportId: parseInt(report._id), // Convert MongoDB _id to integer
      _patientAddress: report.userId,
      _reportName: report.reportName,
      _reportFilePath: report.reportFile,
      _uploadedAt: Math.floor(new Date(report.uploadedAt).getTime() / 1000), // Convert to UNIX timestamp
    }));

    console.log(reportsData)

    // Call the smart contract function to store reports
    await reportsContract.methods.uploadReports(reportsData).send({ from: '0x1955FfCC638eC7d94B2497452a4d36a8142Ce568' });

    console.log(reportsContract.methods)
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
app.use(express.json());

app.post('/registerUser', async (req, res) => {
  try {
      const { name, email, gender, age, role } = req.body;

      console.log(name, email, gender, age, role)
      // Call the smart contract function to register the user
      console.log(userContract.methods)
      await userContract.methods.registerUser(name, email, gender, age, role).send({ from: '0x1955FfCC638eC7d94B2497452a4d36a8142Ce568', gas:5000000 });

      res.status(200).json({ message: 'User registered on the blockchain successfully' });
  } catch (error) {
      console.error('Error registering user on the blockchain:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addTests', async (req, res) => {
  try {
      const { name, age, tests, prescription } = req.body;

      // Call the smart contract function to add tests for the patient
      console.log(testsContract.methods)

      await testsContract.methods.addTests(name, age, tests, prescription).send({ from: '0x1955FfCC638eC7d94B2497452a4d36a8142Ce568', gas: 500000 });

      res.status(200).json({ message: 'Tests added for the patient on the blockchain successfully' });
  } catch (error) {
      console.error('Error adding tests for the patient on the blockchain:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getUserInfo/:userAddress', async (req, res) => {
  try {

      const { userAddress } = req.params;
console.log(userAddress)
      // Call the smart contract function to get user information
      console.log(userContract.methods)
      const formattedAddress = '0x' + userAddress;
      console.log(formattedAddress)
      const userInfo = await userContract.methods.getUserInfo(formattedAddress).call();
      console.log(userInfo)
      res.status(200).json(userInfo);
  } catch (error) {
      console.error('Error getting user information from the blockchain:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getTests/:userAddress/:index', async (req, res) => {
  try {
      const { userAddress, index } = req.params;

      // Call the smart contract function to get test information
      const testInfo = await testsContract.methods.getTestInfo(userAddress, index).call();

      res.status(200).json(testInfo);
  } catch (error) {
      console.error('Error getting test information from the blockchain:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
