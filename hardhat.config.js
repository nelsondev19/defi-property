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
      url: "http://127.0.0.1:7545",
      accounts: {
        mnemonic: "model voice excite enroll salt envelope prefer twelve goose hockey life garlic",
      },
      chainId: 1337,  // Ganache chain ID
      timeout: 60000
    },
    localhost: {
      url: "http://127.0.0.1:7545"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
