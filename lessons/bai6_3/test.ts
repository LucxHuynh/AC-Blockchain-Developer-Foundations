import { ethers } from "ethers";

async function main() {
  console.log("🔍 Connecting to Sepolia network...");

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function getCurrentTokenId() public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function mint(address to) external",
    "function owner() public view returns (address)"
  ];

  const contractAddress = "0xB5371c134F548371e61C327385B844FBa724Bd63";
  const deployerAddress = "0xe643D1908b95fdd7DC4981821279352a194Ddc2B";

  console.log("📍 MyNFT Contract address:", contractAddress);

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    console.log("📞 Calling ERC721 functions...");
    
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    
    console.log("📊 NFT Name:", name);
    console.log("📊 NFT Symbol:", symbol);
    console.log("📊 Total Supply:", totalSupply.toString());

    try {
      const owner0 = await contract.ownerOf(0);
      console.log("🔍 Owner of token #0:", owner0);
    } catch (error) {
      console.log("❌ Token #0 doesn't exist yet");
    }

    // Check deployer balance
    const balance = await contract.balanceOf(deployerAddress);
    console.log("📊 Deployer NFT Balance:", balance.toString());

    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    console.log("✅ Successfully connected to MyNFT contract!");
    
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);