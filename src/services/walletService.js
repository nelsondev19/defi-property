// BUSINNESS LOGIC

class WalletService {
  constructor(repository) {
    this.repository = repository;
  }

  async connectAndLoadData() {
    const wallet = await this.repository.connectWallet();

    return {
      address: wallet,
    };
  }
  async loadConnectedWalletData() {
    const wallet = await this.repository.getConnectedWallet();

    return {
      address: wallet,
    };
  }

  async switchNetwork(chainId) {
    const switched = await this.repository.switchNetwork(chainId);
    return { switched };
  }
}

export { WalletService };
