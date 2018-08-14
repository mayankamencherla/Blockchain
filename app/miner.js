const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');

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
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );

    // Create a block containing all valid transactions
    const block = this.blockchain.addBlock(validTransactions);

    // Synchronize chains in the peer to peer server after new block mined
    this.p2pServer.syncChains();

    // Clear transaction pool of this system
    this.transactionPool.clear();

    // Broadcast to other miners to clear transaction pool
    this.p2pServer.broadcastClearTransactions();

    // Return mined block
    return block;
  }
}

module.exports = Miner;
