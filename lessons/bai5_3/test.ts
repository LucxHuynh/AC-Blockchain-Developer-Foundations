import { ethers } from "ethers";

async function main() {
  console.log("🔍 Connecting to Sepolia network...");
  
  // Kết nối tới Sepolia network
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  // ABI - định nghĩa các function của contract
  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public",
    "function count() public view returns (uint)"
  ];

  // Địa chỉ contract bạn đã deploy ở bài 5.2
  const contractAddress = "0xe02DaB960Fa303618E808d65baa21bAe46490eEb";

  console.log("📍 Contract address:", contractAddress);

  // Tạo contract instance chỉ với provider (chỉ đọc)
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    // Gọi function getCount() để đọc giá trị
    console.log("📞 Calling getCount()...");
    const count = await contract.getCount();
    console.log("📊 Current count is:", count.toString());

    // Thử gọi function count() (cách khác để đọc)
    console.log("📞 Calling count()...");
    const countDirect = await contract.count();
    console.log("📊 Count (direct) is:", countDirect.toString());

    // Kiểm tra network
    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    console.log("✅ Successfully connected to contract via ABI!");
    
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);