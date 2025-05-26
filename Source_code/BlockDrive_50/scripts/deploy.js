const {ethers} = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RideSharing = await hre.ethers.getContractFactory("RideSharing");
  const contract = await RideSharing.deploy();
  await contract.deployed();

  console.log("RideSharing deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
