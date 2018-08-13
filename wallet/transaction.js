const ChainUtil         = require('../chain-util');

class Transaction {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} is exceeding
        SenderWallet's balance: ${senderWallet.balance}`);
      return;
    }

    transaction.outputs.push(...[
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
    ]);

    return transaction;
  }
}

module.exports = Transaction;
