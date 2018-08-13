const Block = require('./../blockchain/block');

describe('Block', () => {

  let data, lastBlock, block;

  beforeEach(() => {
    data = 'bar';
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it('sets the data to match the given input', () => {
    expect(block.data).toEqual(data);
  });

  it('lastHash should match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it('generates a hash that matches the difficulty', () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
  });

  it('lowers the difficulty for slowly mined blocks', () => {
    const difficulty = Block.adjustDifficulty(block, block.timestamp + 3600000);
    expect(difficulty).toEqual(block.difficulty-1);
  });

  it('raises the difficulty for quickly mined blocks', () => {
    const difficulty = Block.adjustDifficulty(block, block.timestamp + 1);
    expect(difficulty).toEqual(block.difficulty+1);
  });
});
