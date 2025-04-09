require("dotenv").config(); // To load environment variables from .env file
const { ethers } = require("ethers");

// RPC URL for TRON EVM network (using the Alchemy Sepolia RPC URL as an example)
const RPC_URL = process.env.RPC_URL;  // Store your RPC URL in .env file
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Load wallet from private key
const privateKey = process.env.PRIVATE_KEY; // Store your private key in .env file
const wallet = new ethers.Wallet(privateKey, provider);

// List of recipient wallets
const recipients = [
  "0x0241Cec7CF360a8722629596D6bB56606fcB9d36",
  "0xDc7179C1bD4452aDCd9550B69267b81D7d6317aC",
  "0x1e70ad7F3e75bb03F4863efAD33aCC9d3f480187",
  "0x53A01E1340C52E45EF2a0Ef85fD79f353F4d3F57",
  "0xC0C17b908d7d514fDD4371F190Eb44a0Fd303c6B",
  "0xd6e34C7c5b101996768cbb0A7A608A9529a4dea8"
];

const sendTrx = async () => {
  try {
    const trxAmount = ethers.parseEther("0.5"); // Convert TRX to Wei format (Ethereum standard)

    // Loop 20 times to send transactions to each recipient
    for (let i = 0; i < 20; i++) { // Repeat 20 times for each recipient
      for (let recipient of recipients) {
        const tx = await wallet.sendTransaction({
          to: recipient,
          value: trxAmount, // 0.1 TRX
        });

        console.log(`Sent 0.5 TRX to ${recipient}. Tx Hash: ${tx.hash}`);

        // Wait for the transaction to be mined
        await tx.wait();
      }
    }

    console.log("All transactions sent successfully.");
  } catch (error) {
    console.error("Error sending transactions:", error);
  }
};

// Run script
sendTrx();
