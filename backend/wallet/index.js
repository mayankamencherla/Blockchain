const {INITIAL_BALANCE} = require('../constants');
const Transaction       = require('./transaction')
const ChainUtil         = require('../chain-util');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}
    `
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);

    if (amount > this.balance) {
      console.log(`Amount ${amount} is greater than balance ${this.balance}`);
      return;
    }

    // Find transaction with this publicKey
    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    // Hardcoding address
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }

  calculateBalance(blockchain) {
    let balance = this.balance;
    let recentInputT = null;
    let transactions = [];

    blockchain.chain.forEach(block =>
      block.data.forEach(transaction => {
        // Add all transactions on blockchain to transactions array
        transactions.push(transaction);

        if (this.publicKey === transaction.input.address &&
            (recentInputT === null ||
             recentInputT.input.timestamp < transaction.input.timestamp)) {
             {
                // Get the most recent transaction that belongs to this wallet
                recentInputT = transaction;
              }
        }
      })
    );

    let startTime = 0;

    if (recentInputT !== null) {
      balance = parseInt(recentInputT.outputs.find(op => op.address === this.publicKey).amount);
      startTime = recentInputT.input.timestamp;
    }

    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find(op => {
          if (op.address === this.publicKey) {
            // Add all incoming transaction amounts to balance
            balance += parseInt(op.amount);
          }
        });
      }
    });

    return balance;
  }
};

module.exports = Wallet;
