const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying credential store with account:", deployer.address);

  const CredentialStore = await hre.ethers.getContractFactory("UBaEducationCredentialsStore");
  const store = await CredentialStore.deploy();

  await store.deployed();

  console.log("✅ UBaEducationCredentialsStore deployed to:", store.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
