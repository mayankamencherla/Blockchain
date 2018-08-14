const ChainUtil = require('../chain-util');

const {DIFFICULTY, MINE_RATE} = require('../constants');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.nonce = nonce;
      this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
      return `Block -
        Timestamp  : ${this.timestamp}
        lastHash   : ${this.lastHash.substring(0, 10)}
        hash       : ${this.hash.substring(0, 10)}
        nonce      : ${this.nonce}
        difficulty : ${this.difficulty}
        data       : ${this.data}
      `;
    }

    /**
     * Origin of the blockchain
     */
    static genesis() {
      const timestamp = '123791827391273';
      const lastHash = '-----';
      const data = [];
      const hash = ChainUtil.hash(timestamp, lastHash, data);

      return new this(timestamp, lastHash, hash, data, 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
      const lastHash = lastBlock.hash;

      let nonce = 0;
      let hash, timestamp;

      let {difficulty} = lastBlock;

      console.log(`Mining block containing ${JSON.stringify(data)}`);

      // Proof of work algorithm
      // We break when hash has DIFFICULTY number
      // of leading zeroes
      do {
        nonce++;
        timestamp = Date.now();

        // Dynamically change difficulty based on current timestamp
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);

        hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

      return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
      const string = `${timestamp}${lastHash}${data}${nonce}${difficulty}`;
      return ChainUtil.hash(string);
    }

    static getHash(block) {
      return Block.hash(block.timestamp, block.lastHash, block.data, block.nonce, block.difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
      let {difficulty} = lastBlock;

      return lastBlock.timestamp + MINE_RATE > currentTime ?
             difficulty + 1 : difficulty - 1;
    }
}

module.exports = Block;
