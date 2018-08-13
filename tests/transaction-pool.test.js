const TransactionPool = require('../wallet/transaction-pool');
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

describe('Transaction Pool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355', 30);
    tp.updateOrAddTransaction(transaction);
  });

  it('should add a transaction to the transaction pool', () => {
    expect(tp.transactions[0]).toEqual(transaction);
  });

  it('should update transaction in the pool', () => {
    const originalTransaction = JSON.stringify(transaction);

    transaction.update(wallet, 'r3c1p13n7', 40);

    tp.updateOrAddTransaction(transaction);

    expect(JSON.stringify(tp.transactions[0])).toEqual(JSON.stringify(transaction));

    expect(JSON.stringify(tp.transactions[0])).not.toEqual(originalTransaction);
  });
});
