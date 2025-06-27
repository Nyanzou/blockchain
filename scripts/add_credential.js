// scripts/add_credential.js

const hre = require("hardhat");

async function main() {
  const [admin] = await hre.ethers.getSigners();

  console.log("Adding credential with admin account:", admin.address);

  const contractAddress = "0x5A427129Ef799Fd26366bea082fe80139d69De05"; // Use your deployed contract address
  const CredentialStore = await hre.ethers.getContractAt("UBaEducationCredentialsStore", contractAddress);

  const studentName = "Teneng Reme Nyanzou";
  const program = "Cybersecurity";
  const level = "MSc 2";
  const year = 2025;

  const tx = await CredentialStore.addCredential(studentName, program, level, year);
  await tx.wait();

  console.log(`✅ Credential for ${studentName} added successfully.`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
