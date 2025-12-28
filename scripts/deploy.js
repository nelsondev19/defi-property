const hre = require("hardhat");

// Function to create a home transaction (simulates receiving data from frontend)
async function createHomeTransaction(factory, propertyData, accounts) {
  const { address, zip, city, realtorFee, price } = propertyData;
  const { sellerAddress, buyerAddress } = accounts;

  console.log("Creating HomeTransaction with provided data...");
  console.log("Property Address:", address);
  console.log("ZIP:", zip);
  console.log("City:", city);
  console.log("Price:", hre.ethers.utils.formatEther(price), "ETH");
  console.log("Realtor Fee:", hre.ethers.utils.formatEther(realtorFee), "ETH");
  console.log("");

  const tx = await factory.create(
    address,
    zip,
    city,
    realtorFee,
    price,
    sellerAddress,
    buyerAddress
  );
  
  await tx.wait();
  
  // Get the created instance
  const instanceCount = await factory.getInstanceCount();
  const homeTransactionInstance = await factory.getInstance(instanceCount - 1);
  
  return {
    transactionHash: tx.hash,
    contractAddress: homeTransactionInstance
  };
}

async function main() {
  console.log("Starting deployment to Ganache...\n");

  // Get accounts from Ganache
  const signers = await hre.ethers.getSigners();
  const realtor = signers[0];
  const seller = signers[1];
  const buyer = signers[2];

  // Deploy Factory contract
  console.log("Deploying Factory contract...");
  const Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();

  console.log("✓ Factory contract deployed to:", factory.address);
  console.log("");

  // Example data (simulates data from frontend POST request)
  // This would normally come from req.body in Express
  const propertyData = {
    address: "123 Main Street",
    zip: "12345",
    city: "New York",
    realtorFee: hre.ethers.utils.parseEther("0.05"),  // 0.05 ETH
    price: hre.ethers.utils.parseEther("425")         // 425 ETH
  };

  const accounts = {
    realtorAddress: realtor.address,
    sellerAddress: seller.address,
    buyerAddress: buyer.address
  };

  // Create HomeTransaction using the function
  const result = await createHomeTransaction(factory, propertyData, accounts);

  console.log("✓ HomeTransaction created successfully!");
  console.log("");

  // Save deployment info
  console.log("=== Deployment Summary ===");
  console.log("Network:", hre.network.name);
  console.log("Factory Address:", factory.address);
  console.log("HomeTransaction Address:", result.contractAddress);
  console.log("Transaction Hash:", result.transactionHash);
  console.log("");
  console.log("Accounts:");
  console.log("  Realtor:", realtor.address);
  console.log("  Seller:", seller.address);
  console.log("  Buyer:", buyer.address);
  console.log("");
  
  console.log("Save these addresses to use in the frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
