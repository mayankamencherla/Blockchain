const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId, index;

    transactionWithId = this.transactions.find(t => t.id === transaction.id);

    index = this.transactions.indexOf(transactionWithId);

    if (index === -1) {
      // Transaction added to pool
      this.transactions.push(transaction);
    } else {
      // Transaction exists in pool, so update
      this.transactions[index] = transaction;
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        total += parseInt(output.amount);
        return total;
      }, 0);

      console.log(`total: ${outputTotal}`);

      if (outputTotal !== transaction.input.amount) {
        console.log(`Invalid transaction from ${transaction.input.address}`);
        return;
      } else if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}`);
        return;
      }

      return transaction;
    });
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
