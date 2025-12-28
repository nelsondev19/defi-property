require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.5.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    ganache: {
      url: "HTTP://0.0.0.0:7545",
      accounts: {
        mnemonic: "market garment level fluid hard enact liquid coast stone artwork palm tomato",
      },
      chainId: 1337,  // Ganache chain ID
      timeout: 60000
    },
    localhost: {
      url: "HTTP://0.0.0.0:7545"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
