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
}

module.exports = TransactionPool;
