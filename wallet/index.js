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

  createTransaction(recipient, amount, transactionPool) {
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
};

module.exports = Wallet;
