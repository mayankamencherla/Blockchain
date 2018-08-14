const Transaction = require('../wallet/transaction');
const Wallet      = require('../wallet');
const {MINING_REWARD} = require('../constants');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13n7';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it(`outputs ${amount} subtracted from sender wallet balance`, () => {
    // Get the sender wallet's output
    const op = transaction.outputs.find(output => output.address === wallet.publicKey);
    expect(op.amount).toEqual(wallet.balance - amount);
  });

  it(`outputs ${amount} sent to recipient`, () => {
    // Get the sender wallet's output
    const op = transaction.outputs.find(output => output.address === recipient);
    expect(op.amount).toEqual(amount);
  });

  it(`Doesn't create transaction when amount exceeds balance`, () => {
    transaction = Transaction.newTransaction(wallet, recipient, 500000);
    expect(transaction).toEqual(undefined);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 560000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });

  it('updates transaction when amount is less than wallet balance', () => {
    const nextAmount = 20;
    const nextRecipient = 'n3x7-4ddr355';

    let op = transaction.outputs.find(output => output.address === wallet.publicKey);

    const initialAmount = op.amount;

    transaction.update(wallet, nextRecipient, nextAmount);

    op = transaction.outputs.find(output => output.address === wallet.publicKey);

    expect(op.amount).toEqual(initialAmount - nextAmount);

    const nextRecipientOutput = transaction.outputs.find(output => output.address === nextRecipient);

    expect(nextRecipientOutput.amount).toEqual(nextAmount);
  });

  it('does not update transaction when amount is greater than wallet balance', () => {
    const nextAmount = 20000;
    const nextRecipient = 'n3x7-4ddr355';

    let op = transaction.outputs.find(output => output.address === wallet.publicKey);

    const initialAmount = op.amount;

    transaction.update(wallet, nextRecipient, nextAmount);

    op = transaction.outputs.find(output => output.address === wallet.publicKey);

    expect(op.amount).toEqual(initialAmount);
  });

  describe('Creating a reward transaction', () => {
    beforeEach(() => {
      transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    });

    it(`Reward the miners wallet`, () => {
      const amount = transaction.outputs.find(op => op.address === wallet.publicKey).amount;
      expect(amount).toEqual(MINING_REWARD);
    });
  });
});
