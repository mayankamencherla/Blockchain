const TransactionPool = require('../wallet/transaction-pool');
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

describe('Transaction Pool', () => {
  let tp, wallet, transaction;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = wallet.createTransaction('r4nd-4ddr355', 30, tp);
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

  describe('mixing valid and corrupt transactions', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [...tp.transactions];
      for (let i=0; i<6; i++) {
        wallet = new Wallet();
        transaction = wallet.createTransaction('r4nd-4ddr355', 30, tp);

        if (i % 2 == 0) {
          transaction.input.amount = 3435345;
        } else {
          validTransactions.push(transaction);
        }
      }
    });

    it('shows a difference between valid and invalid transactions', () => {
      expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
    });

    it('grabs valid transactions', () => {
      expect(tp.validTransactions()).toEqual(validTransactions);
    });
  });
});
