import { ethers } from "ethers";

async function main() {
  console.log("🔍 Connecting to Sepolia network...");

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function mint(address to, uint256 amount) external",
    "function owner() public view returns (address)"
  ];

  const contractAddress = "0xE6928C142126d3E746346e5510bDC18e70626Ba8";

  const privateKey = "0xfcb7b0d1bd230cf089b77b5d526a81a80137d6c3dd70f1b2611b3d20d3d828fb";
  const wallet = new ethers.Wallet(privateKey);
  const deployerAddress = wallet.address;

  console.log("📍 MyMintableToken Contract address:", contractAddress);
  console.log("📍 Deployer Address:", deployerAddress);

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    console.log("📞 Calling ERC20 functions...");
    
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();
    
    console.log("📊 Token Name:", name);
    console.log("📊 Token Symbol:", symbol);
    console.log("📊 Decimals:", decimals.toString());
    console.log("📊 Total Supply:", ethers.formatUnits(totalSupply, 18));

    // Check deployer balance
    const balance = await contract.balanceOf(deployerAddress);
    console.log("📊 Deployer Balance:", ethers.formatUnits(balance, 18), symbol);

    // Check owner
    const owner = await contract.owner();
    console.log("👑 Contract Owner:", owner);
    console.log("🔍 Is Deployer Owner?", owner.toLowerCase() === deployerAddress.toLowerCase());

    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    console.log("✅ Successfully connected to MyMintableToken contract!");
    
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);