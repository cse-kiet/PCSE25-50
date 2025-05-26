
export const contractABI = [
    // Paste your RideSharing contract ABI JSON here
//   ];
//   "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "passenger",
          "type": "address"
        }
      ],
      "name": "RideBooked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "driver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "origin",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "destination",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
        }
      ],
      "name": "RideCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_rideId",
          "type": "uint256"
        }
      ],
      "name": "bookRide",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_destination",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_fare",
          "type": "uint256"
        }
      ],
      "name": "createRide",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_rideId",
          "type": "uint256"
        }
      ],
      "name": "getRide",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "enum RideSharing.RideStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rideCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rides",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "driver",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "destination",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "fare",
          "type": "uint256"
        },
        {
          "internalType": "enum RideSharing.RideStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "passenger",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];