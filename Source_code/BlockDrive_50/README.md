# RideSharing DApp

This is a basic decentralized ride-sharing system built with Solidity and Hardhat.

## Features

- Drivers can create rides
- Passengers can book rides by paying the fare

## Getting Started

### Install dependencies

```bash
npm install
```

### Compile contracts

```bash
npx hardhat compile
```

### Test the contract

```bash
npx hardhat test
```

### Deploy the contract

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

You can modify the network configuration in `hardhat.config.js` to deploy on a testnet like Goerli or Sepolia.

---
