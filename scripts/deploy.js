import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // Parámetros del contrato
  const homeAddress = "123 Main Street";
  const zip = "12345";
  const city = "New York";
  const realtorFee = ethers.parseEther("0.1"); // 0.1 ETH
  const price = ethers.parseEther("1"); // 1 ETH

  // Direcciones de ejemplo (puedes usar tus propias direcciones de MetaMask)
  const realtor = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Cambiar
  const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Cambiar
  const buyer = "0xe18ea4685bbabbb71e8baff84362f773ad7a7c42"; // Cambiar

  const HomeTransaction = await ethers.getContractFactory(
    "HomeTransaction"
  );
  const homeTransaction = await HomeTransaction.deploy(
    homeAddress,
    zip,
    city,
    realtorFee,
    price,
    realtor,
    seller,
    buyer
  );

  await homeTransaction.waitForDeployment();

  const contractAddress = await homeTransaction.getAddress();
  console.log("HomeTransaction deployed to:", contractAddress);
  console.log("\nGuarda esta información:");
  console.log("Contract Address:", contractAddress);
  console.log("Realtor:", realtor);
  console.log("Seller:", seller);
  console.log("Buyer:", buyer);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
