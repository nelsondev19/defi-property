class WalletRepository {
  async connectWallet() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getConnectedWallet() {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });      
      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async switchNetwork(chainId) {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });      
      return true;
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: "Ganache",
              rpcUrls: ["http://127.0.0.1:7545"],
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });
        console.log("Ganache network added successfully");
      } else {
        throw new Error(`Error switching network: ${error.message}`);
      }
    }
  }
}

export { WalletRepository };
