import abi from "../../blockchain/build/contracts/Reports.json" assert { type: "json" };
export const REPORTS_SIMP_STORAGE_ADDRESS =
  "0x6f7693f64F77f34D1cCeD66306279dcA021dC441";
  export const REPORTS_SIMP_STORAGE_ABI = abi.abi;
// export const REPORTS_SIMP_STORAGE_ABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "reportId",
//         "type": "uint256"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "patientAddress",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "reportName",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "reportFilePath",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "uploadedAt",
//         "type": "uint256"
//       }
//     ],
//     "name": "ReportUploaded",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "reports",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "patientAddress",
//         "type": "address"
//       },
//       {
//         "internalType": "string",
//         "name": "reportName",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "reportFilePath",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "uploadedAt",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "patientAddress",
//             "type": "address"
//           },
//           {
//             "internalType": "string",
//             "name": "reportName",
//             "type": "string"
//           },
//           {
//             "internalType": "string",
//             "name": "reportFilePath",
//             "type": "string"
//           },
//           {
//             "internalType": "uint256",
//             "name": "uploadedAt",
//             "type": "uint256"
//           }
//         ],
//         "internalType": "struct Reports.Report[]",
//         "name": "report",
//         "type": "tuple[]"
//       }
//     ],
//     "name": "uploadReports",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_reportName",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_reportFilePath",
//         "type": "string"
//       }
//     ],
//     "name": "uploadReport",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "_reportId",
//         "type": "uint256"
//       }
//     ],
//     "name": "getReport",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       },
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   }
// ];