const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');

describe('Wallet', () => {
  let tp, wallet;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
  })

  describe('Wallet is creating a transaction', () => {
    let transaction, sentAmount, recipient;

    beforeEach(() => {
      sentAmount = 50;
      recipient = 'r4nd0m-4ddr355';
      transaction = wallet.createTransaction(recipient, sentAmount, tp);
    });

    describe('And doing the same transaction', () => {

      beforeEach(() => {
        wallet.createTransaction(recipient, sentAmount, tp);
      });

      it('doubles the send amount subtracted from the wallet', () => {
        const walletOutput = transaction.outputs.find(o => o.address === wallet.publicKey);
        expect(walletOutput.amount).toEqual(wallet.balance - 2*sentAmount);
      });

      it('clones the send amount for recipient', () => {
        // We made 2 payments to the same recipient of same value
        expect(transaction.outputs.filter(o => o.address === recipient)
                                  .map(o => o.amount))
                                  .toEqual([sentAmount, sentAmount]);
      });
    });
  });
});
