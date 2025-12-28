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
}

export { WalletService };
