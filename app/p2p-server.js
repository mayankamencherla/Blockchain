const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// ws://localhost:5001, ws://localhost:5002 ....
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS'
};

class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({port: P2P_PORT});

    // Connect incoming socket requests to server - event listener
    server.on('connection', socket => this.connectSocket(socket));

    // Connect this server to all its peers
    this.connectToPeers();

    console.log(`Listening for peer to peer connections on ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new Websocket(peer);

      socket.on('open', () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');

    // All connected sockets
    this.messageHandler(socket);

    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);

      switch(data.type) {
        case MESSAGE_TYPES.chain:
          // Replace blockchain locally with broadcasted one
          this.blockchain.replaceChain(data.chain);
          break;

        case MESSAGE_TYPES.transaction:
          // add broadcasted transaction to pool
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;

        case MESSAGE_TYPES.clear_transactions:
          // Clears transactions in the pool
          this.transactionPool.clear();
          break;

        default:
          break;
      }
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.chain,
      chain: this.blockchain.chain
    }));
  }

  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => {
      this.sendTransaction(socket, transaction);
    });
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.transaction,
      transaction
    }));
  }

  broadcastClearTransactions() {
    this.sockets.forEach(socket => {
      socket.send(JSON.stringify({
        type: MESSAGE_TYPES.clear_transactions
      }));
    });
  }
};

module.exports = P2pServer;
