const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Blockchain = require('../blockchain');
const {INITIAL_BALANCE} = require('../constants');

describe('Wallet', () => {
  let tp, wallet;

  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
  })

  describe('Wallet is creating a transaction', () => {
    let transaction, sentAmount, recipient, bc;

    beforeEach(() => {
      sentAmount = 50;
      recipient = 'r4nd0m-4ddr355';
      bc = new Blockchain();
      transaction = wallet.createTransaction(recipient, sentAmount, bc, tp);
    });

    describe('And doing the same transaction', () => {

      beforeEach(() => {
        wallet.createTransaction(recipient, sentAmount, bc, tp);
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

  describe('calculating a balance', () => {
    let addBalance, repeatAdd, senderWallet, bc;

    beforeEach(() => {
      bc = new Blockchain();
      senderWallet = new Wallet();
      addBalance = 100;
      repeatAdd = 3; // 3*100 < 500

      for (let i=0; i<repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
      }

      // Add the transactions in a block to the blockchain
      bc.addBlock(tp.transactions);
    });

    it('calculates the balance for the blockchain transactions of the recipient', () => {
      expect(wallet.calculateBalance(bc)).toEqual(repeatAdd*addBalance + INITIAL_BALANCE);
    });

    it('calculates the balance for the blockchain transactions of the sender', () => {
      expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - repeatAdd*addBalance);
    });

    describe('recipient conducts a transaction', () => {
      let subtractBalance, recipientBalance;

      beforeEach(() => {
        tp.clear();
        subtractBalance = 60;
        recipientBalance = wallet.calculateBalance(bc);
        // Send subtractBalance to senderWallet from wallet
        wallet.createTransaction(senderWallet.publicKey, subtractBalance, bc, tp);
        bc.addBlock(tp.transactions);
      });

      describe('sender sends another transaction to the recipient', () => {
        beforeEach(() => {
          tp.clear();
          senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
          bc.addBlock(tp.transactions);
        });

        it('calculates recipient balance using transactions since recent one', () => {
          expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - subtractBalance + addBalance);
        });
      });
    });
  });
});
