// const express = require('express');
// const Reports = require('./Models/ReportUpload');
// const Web3 = require('web3');
// const { REPORTS_SIMP_STORAGE_ADDRESS, REPORTS_SIMP_STORAGE_ABI } = require('./Config/ReportsConfig');

// const app = express();
// const port = 3002;

// // Assuming Ganache is running on the default port (http://127.0.0.1:7545)
// const ganacheProvider = 'http://127.0.0.1:7545';

// const web3 = new Web3(ganacheProvider);
// const reportsContract = new web3.eth.Contract(REPORTS_SIMP_STORAGE_ABI, REPORTS_SIMP_STORAGE_ADDRESS);

// const router = express.Router();

// router.use(express.json());

// // Endpoint to store reports on the blockchain for a specific user
// router.post('/storeReports/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Fetch reports from MongoDB for the given userId
//     const userReports = await Reports.find({ userId });

//     if (!userReports || userReports.length === 0) {
//       return res.status(404).json({ error: 'No reports found for the user' });
//     }

//     // Convert report data to the format expected by the smart contract
//     const reportsData = userReports.map((report) => ({
//       reportName: report.reportName,
//       reportFilePath: report.reportFilePath,
//       uploadedAt: report.uploadedAt,
//     }));

//     // Call the smart contract function to store reports
//     await reportsContract.methods.storeReports(userId, reportsData).send({ from: 'yourBlockchainAddress' });

//     res.status(200).json({ message: 'Reports stored on the blockchain successfully' });
//   } catch (error) {
//     console.error('Error storing reports on the blockchain:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening on http://localhost:${port}`);
// });
