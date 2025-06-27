// scripts/verify_credential.js

const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5A427129Ef799Fd26366bea082fe80139d69De05"; // Use your deployed contract address
  const CredentialStore = await hre.ethers.getContractAt("UBaEducationCredentialsStore", contractAddress);

  const studentName = "Teneng Reme Nyanzou";
  const program = "Cybersecurity";
  const level = "MSc 2";
  const year = 2025;

  const result = await CredentialStore.verifyCredential(studentName, program, level, year);

  if (result) {
    console.log("✅ Credential is verified on-chain.");
  } else {
    console.log("❌ Credential not found or not verified.");
  }
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
