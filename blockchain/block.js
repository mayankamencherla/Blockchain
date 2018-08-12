const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
    }

    toString() {
      return `Block -
        Timestamp: ${this.timestamp}
        lastHash : ${this.lastHash.substring(0, 10)}
        hash     : ${this.hash.substring(0, 10)}
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

      return new this(timestamp, lastHash, hash, data);
    }

    static mineBlock(lastBlock, data) {
      const timestamp = Date.now();
      const lastHash = lastBlock.hash;
      const hash = Block.hash(timestamp, lastHash, data);

      return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
      return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static getHash(block) {
      return Block.hash(block.timestamp, block.lastHash, block.data);
    }
}

module.exports = Block;
