require("@nomiclabs/hardhat-waffle");
const { privateKey1, privateKey2 } = require('./secrets.json');

module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/2d7682d0b4a5400aad7332bfd3d2bbaa",
      accounts: [privateKey1]
    }
  },
  solidity: "0.8.20",
};

//Contract deployed to address: 0x937dc6661f64D2322Dc8583545ca9Ede0F6B07A9