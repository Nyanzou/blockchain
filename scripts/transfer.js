const { ethers } = require("hardhat");

async function main() {
    const [sender] = await ethers.getSigners();

    const tokenAddress = "0x83a8c9dd7F14048cD3556007eA22b7fcDbD4f606";
    const recipient = "0x83a8c9dd7F14048cD3556007eA22b7fcDbD4f606";

    // Paste your contract ABI here or import it
    const tokenABI = [
        "function transfer(address to, uint256 amount) public returns (bool)",
        "function decimals() view returns (uint8)"
    ];

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, sender);

    const decimals = await tokenContract.decimals();
    const amount = ethers.utils.parseUnits("10", decimals);

    const tx = await tokenContract.transfer(recipient, amount);
    console.log("Transaction sent:", tx.hash);

    await tx.wait();
    console.log("✅ Transfer completed.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
