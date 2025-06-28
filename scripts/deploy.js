// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get the deployer's account (will also be the contract's initial owner)
  const [deployer] = await hre.ethers.getSigners();

  console.log("📤 Deploying contract with account:", deployer.address);

  // 3 specified addresses for multisig minting
  const minters = [
    "0x6375973bc5307C6779c8839c50bf0F80C49DF52d",
    "0xBfB07c8dB6892A9777b0cFb72bC11e77D026F5B5",
    "0x90d5719580023f4F69A189BA932F6629199AA3D3"
  ];

  // Replace "Group1Token" with your actual contract name if you renamed it
  const Token = await hre.ethers.getContractFactory("Group4Token");
  const token = await Token.deploy(minters, deployer.address);

  await token.deployed();

  console.log("✅ Group4Token deployed to:", token.address);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
