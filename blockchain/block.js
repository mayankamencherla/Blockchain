const SHA256 = require('crypto-js/sha256');

const {DIFFICULTY} = require('../constants');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.nonce = nonce;
    }

    toString() {
      return `Block -
        Timestamp: ${this.timestamp}
        lastHash : ${this.lastHash.substring(0, 10)}
        hash     : ${this.hash.substring(0, 10)}
        nonce    : ${this.nonce}
        data     : ${this.data}
      `;
    }

    /**
     * Origin of the blockchain
     */
    static genesis() {
      const timestamp = '123791827391273';
      const lastHash = '-----';
      const data = [];
      const hash = Block.hash(timestamp, lastHash, data);

      return new this(timestamp, lastHash, hash, data, 0);
    }

    static mineBlock(lastBlock, data) {
      const lastHash = lastBlock.hash;

      let nonce = 0;
      let hash, timestamp;

      // Proof of work algorithm
      // We break when hash has DIFFICULTY number
      // of leading zeroes
      do {
        nonce++;
        timestamp = Date.now();
        hash = Block.hash(timestamp, lastHash, data, nonce);
      } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

      return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
      return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static getHash(block) {
      return Block.hash(block.timestamp, block.lastHash, block.data, block.nonce);
    }
}

module.exports = Block;
