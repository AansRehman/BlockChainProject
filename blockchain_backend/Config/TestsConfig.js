export const TESTS_SIMP_STORAGE_ADDRESS =
  "0x079b63318A58E9ECA3f600D6fa158fFEbdF4fb74";
  import abi from "../../blockchain/build/contracts/TestsContract.json" assert { type: "json" };
  export const TESTS_SIMP_STORAGE_ABI = abi.abi;
// const SIMP_STORAGE_ABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "patientAddress",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "age",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "date",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "string[]",
//         "name": "tests",
//         "type": "string[]"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "prescription",
//         "type": "string"
//       }
//     ],
//     "name": "TestsAdded",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "patientTests",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "date",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "prescription",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_name",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string[]",
//         "name": "_tests",
//         "type": "string[]"
//       },
//       {
//         "internalType": "string",
//         "name": "_prescription",
//         "type": "string"
//       }
//     ],
//     "name": "addTests",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "patientAddress",
//         "type": "address"
//       }
//     ],
//     "name": "getTestsCount",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
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
//         "internalType": "address",
//         "name": "patientAddress",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "index",
//         "type": "uint256"
//       }
//     ],
//     "name": "getTestInfo",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "date",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string[]",
//         "name": "tests",
//         "type": "string[]"
//       },
//       {
//         "internalType": "string",
//         "name": "prescription",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   }
// ];
