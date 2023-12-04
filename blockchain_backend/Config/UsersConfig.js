export const USERS_SIMP_STORAGE_ADDRESS =
  "0x7A5dB94Bf452b001245965C18D299616e82b33AA";
  import abi from "../../blockchain/build/contracts/UserContract.json" assert { type: "json" };
  export const USERS_SIMP_STORAGE_ABI = abi.abi;
// const SIMP_STORAGE_ABI = [
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "userAddress",
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
//         "internalType": "string",
//         "name": "email",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "gender",
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
//         "internalType": "string",
//         "name": "role",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "createdAt",
//         "type": "uint256"
//       }
//     ],
//     "name": "UserRegistered",
//     "type": "event"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "name": "users",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "email",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "gender",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "role",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "createdAt",
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
//         "internalType": "string",
//         "name": "_name",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_email",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_gender",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "_age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "_role",
//         "type": "string"
//       }
//     ],
//     "name": "registerUser",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "userAddress",
//         "type": "address"
//       }
//     ],
//     "name": "getUserInfo",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "name",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "email",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "gender",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "age",
//         "type": "uint256"
//       },
//       {
//         "internalType": "string",
//         "name": "role",
//         "type": "string"
//       },
//       {
//         "internalType": "uint256",
//         "name": "createdAt",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function",
//     "constant": true
//   }
// ];