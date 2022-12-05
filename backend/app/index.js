const express = require('express');
const cors = require('cors');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
const dbCoonect = require('../db/dbConnect');
const cookieParser = require("cookie-parser");
const authRoutes = require("../routers/authRoutes");

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const wallet = new Wallet();
// A miner consisting of the local blockchain, transaction pool, currency wallet and the p2pServer
const miner = new Miner(bc, tp, wallet, p2pServer);
 
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

app.get('/publicKey', (req, res) => {
  res.json(wallet.publicKey);
  console.log({"publicKey": [wallet.publicKey]});
});

/**
 * Mine block containing transactions
 */
app.get('/mineTransactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added ${block.toString()}`);

  res.redirect('/blocks');
});

app.get('/balance', (req, res) => {
    balance = wallet.calculateBalance(bc);
    res.json(balance);
    console.log(balance);
})

app.post('/transact', (req, res) => {
  const {recipient, amount} = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);

  p2pServer.broadcastTransaction(transaction);

  res.redirect('/transactions');
});

/**
 * Mine block containing data
 */
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  // Sync all chains - making a decentralized system
  p2pServer.syncChains();

  res.redirect('/blocks');
});

dbCoonect()
app.use(bodyParser.json());
//app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json())
app.use("/", authRoutes)

//mongoose.connection.once('open', () => {
  app.listen(3001, () => console.log(`Listening on port ${HTTP_PORT}`));
  p2pServer.listen();
//})
