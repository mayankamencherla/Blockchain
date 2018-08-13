const Transaction = require('../wallet/transaction');
const Wallet      = require('../wallet');

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
});
