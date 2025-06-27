const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const minters = [
    "0x6375973bc5307C6779c8839c50bf0F80C49DF52d",  // Replace with real MetaMask addresses
    "0xBfB07c8dB6892A9777b0cFb72bC11e77D026F5B5",
    "0x90d5719580023f4F69A189BA932F6629199AA3D3"
  ];

  const Token = await hre.ethers.getContractFactory("Group1Token");
  const token = await Token.deploy(minters, deployer.address);

  await token.deployed();

  console.log("Group1Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
