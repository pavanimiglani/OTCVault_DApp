const { ethers } = require("hardhat");

async function main() {
  const OTC = await ethers.getContractFactory("OTC"); 
  const otc = await OTC.deploy();

  console.log("Contract deployed to address:", otc.address);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
