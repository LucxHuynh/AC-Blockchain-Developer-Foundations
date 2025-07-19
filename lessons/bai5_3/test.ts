import { ethers } from "ethers";

async function main() {
  console.log("🔍 Connecting to Sepolia network...");

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public",
    "function count() public view returns (uint)"
  ];

  const contractAddress = "0xe02DaB960Fa303618E808d65baa21bAe46490eEb";

  console.log("📍 Contract address:", contractAddress);

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    console.log("📞 Calling getCount()...");
    const count = await contract.getCount();
    console.log("📊 Current count is:", count.toString());

    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    console.log("✅ Successfully connected to contract via ABI!");
    
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);