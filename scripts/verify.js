const hre = require("hardhat");

async function main() {
  const minters = [
    "0x6375973bc5307C6779c8839c50bf0F80C49DF52d",
    "0xBfB07c8dB6892A9777b0cFb72bC11e77D026F5B5",
    "0x90d5719580023f4F69A189BA932F6629199AA3D3"
  ];

  const initialOwner = "0x6375973bc5307C6779c8839c50bf0F80C49DF52d";

  await hre.run("verify:verify", {
    address: "0xe612c205A73409cF072517140cd18317aDBF828b",
    constructorArguments: [minters, initialOwner],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
