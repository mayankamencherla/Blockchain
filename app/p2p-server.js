const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// ws://localhost:5001, ws://localhost:5002 ....
const peers = process.env.PEER ? process.end.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({port: P2P_PORT});

    // Connect incoming socket requests to server
    server.on('connection', socket => this.connectSocket(socket));

    console.log(`Listening for peer to peer connections on ${P2P_PORT}`);
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
  }
};
