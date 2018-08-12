const Blockchain = require('./../blockchain/index');
const Block      = require('./../blockchain/block');

describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('start with the genesis block first', () => {
    expect(bc.chain[0].lastHash).toEqual(Block.genesis().lastHash);
  });

  it('adds a new block to the blockchain', () => {
    const data = 'foo';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('should validate a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'not foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {
    bc2.addBlock('doo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('does not replace chain when newChain.length <= chain.length', () => {
    bc.addBlock('f00');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  });
});
