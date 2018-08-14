class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();

    // Include a reward for the miner in the valid validTransactions

    // Create a block containing all valid transactions

    // Synchronize chains in the peer to peer server

    // Clear transaction pool of this system as well as all other systems to be cleared
  }
}

module.exports = Miner;
