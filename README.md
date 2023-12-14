# OTCVault_DApp Project

This decentralized application (DApp) enables Over-The-Counter (OTC) trading of ERC20 tokens without intermediaries. Users can create, browse, and fulfill token exchange offers directly on the Ethereum blockchain.

## Project Structure

The project consists of the following directories and files:

- `/contracts`: Contains Solidity smart contracts. The main contract file is `Listing.sol`.
- `/test`: Contains test files to validate smart contract functionalities.The main test file is 'OTC Test.js'. 
- `hardhat.config.js`: Configuration file for the Hardhat Ethereum development environment.
- `/scripts`: Includes deployment scripts. The main deployment script is `deploy.js`.

### Prerequisites

- Node.js and npm installed.
- Hardhat configured globally or locally in the project.

### Installation

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install

### Compiling 

npx hardhat compile

### Deployment

npx hardhat run scripts/deploy.js --network sepolia
