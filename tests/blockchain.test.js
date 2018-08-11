const Blockchain = require('./../blockchain');
const Block      = require('./../block');

describe('Blockchain', () => {
  let bc;

  beforeEach(() => {
    bc = new Blockchain();
  });

  it('start with the genesis block first', () => {
    expect(bc.chain[0].lastHash).toEqual(Block.genesis().lastHash);
  });

  it('adds a new block to the blockchain', () => {
    const data = 'foo';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });
});
