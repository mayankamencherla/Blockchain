const SHA256 = require('crypto-js/sha256');

class MerkleTree {
    constructor(nodeList) {
        this.leaves = nodeList;
        this.layers = [this.leaves]; // tree levels
        this.calculateMerkleTree(this.leaves);
    }

calculateMerkleTree(nodes) {
    if (nodes.length == 1) {
        return nodes[0];
    }
    const layerIndex = this.layer.length;
    this.layers.push([])

    // take 2 hashes of different Txs and hash them, push to the layers list (loop until no more even no. of leaves)
    for (let i = 0; i < nodes.length - 1; i+=1) {
        this.layers[layerIndex].push(SHA256(nodes[i] + nodes[i+1]).toString);
    }
    // takes care of odd no. leaves in the tree - take the last one left after the loop and yossi hash it with itself, push to list
    if (nodes.length % 2 == 1) {
        this.layers[layerIndex].push(SHA256(nodes[nodes.length-1], nodes[nodes.length-1]).toString);
    }

    return this.calculateMerkleTree(this.layers[layerIndex]);
}


getLeaves() {
    return this.leaves;
}

getLayers() {
    return this.layers;
}

getRoot() {
    return this.layers[this.layers.length - 1][0];
}


getProof(leaf) {
    let index;
    const proof = [];

    for (let i = 0; i < this.leaves.length; i++) {
      if (leaf === this.leaves[i].toString()) {
        index = i;
        break;
      }
    }

    if (!index) {
      return proof;
    }

    for (let i = 0; i < this.layers.length - 1; i++) {
      const layer = this.layers[i];
      const isRightNode = index % 2;
      const pairIndex = isRightNode ? index - 1 : index + 1;

      proof.push({
        position: isRightNode ? 'left' : 'right',
        data: layer[pairIndex].toString()
      });

      index = Math.floor(index / 2);
    }

    return proof;
  }

  verify(proof, targetNode, root) {
    let hash = targetNode

    if (!Array.isArray(proof) || !proof.length || !targetNode || !root) {
      return false;
    }

    for (let i = 0; i < proof.length; i++) {
      const node = proof[i]
      const isRightNode = (node.position === 'right')
      const buffers = []

      if (isRightNode) {
        hash = SHA256(hash.toString() + node.data.toString()).toString();
      } else {
        hash = SHA256(node.data.toString() + hash.toString()).toString();
      }

    }

    return hash === root.toString();
  }
}

module.exports.MerkleTree = MerkleTree;