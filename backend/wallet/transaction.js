const ChainUtil         = require('../chain-util');
const {MINING_REWARD}   = require('../constants');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

    if (amount > senderOutput.amount) {
      console.log(`${amount} exceeds wallet balance`);
      return;
    }

    senderOutput.amount -= amount;

    this.outputs.push({
      amount,
      address: recipient
    });

    Transaction.signTransaction(this, senderWallet);
  }

  static transactionWithOutputs(senderWallet, outputs) {
    const transaction = new this();
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} is exceeding
        SenderWallet's balance: ${senderWallet.balance}`);
      return;
    }

    const outputs = [
      // First output is sender's balance and address
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey
      },
      // Second output is amount being sent and recipient address
      {
        amount,
        address: recipient
      }
    ];

    return Transaction.transactionWithOutputs(senderWallet, outputs);
  }

  static rewardTransaction(minerWallet, blockchainWallet) {
    // blokchain wallet sends reward to miner wallet
    return Transaction.transactionWithOutputs(blockchainWallet, [{
      amount: MINING_REWARD,
      address: minerWallet.publicKey
    }]);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

module.exports = Transaction;
