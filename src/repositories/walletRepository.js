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
}

export { WalletRepository };
