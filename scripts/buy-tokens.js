const { ethers } = require("hardhat");

async function main() {
  const [buyer] = await ethers.getSigners(); // Wallet that sends ETH to buy tokens

  const tokenAddress = "0x83a8c9dd7F14048cD3556007eA22b7fcDbD4f606"; // Replace with your actual token contract
  const tokenABI = [
    "function buyTokens() public payable",
    "function balanceOf(address) view returns (uint)",
    "function decimals() view returns (uint8)"
  ];

  const token = new ethers.Contract(tokenAddress, tokenABI, buyer);

  const amountToSend = ethers.utils.parseEther("0.01"); // 0.01 ETH

  const tx = await token.buyTokens({ value: amountToSend });
  console.log("Buying tokens... TX Hash:", tx.hash);
  await tx.wait();

  const decimals = await token.decimals();
  const balance = await token.balanceOf(buyer.address);
  console.log(`✅ Token balance after purchase: ${ethers.utils.formatUnits(balance, decimals)} tokens`);
}

main().catch((error) => {
  console.error("❌ Error buying tokens:", error);
  process.exit(1);
});
