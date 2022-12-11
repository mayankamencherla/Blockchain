
const Blockchain = require('../blockchain/index');
const P2pServer = require('../app/p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('../app/miner');


const bc = new Blockchain();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const wallet = new Wallet();
// A miner consisting of the local blockchain, transaction pool, currency wallet and the p2pServer
const miner = new Miner(bc, tp, wallet, p2pServer);

/**
 * Mine block containing transactions
 */
 module.exports.mineTransactions = (req, res) => {
    const block = miner.mine();
    console.log(`New block added ${block.toString()}`);
  
    res.redirect('/blocks');
};

/**
 * Mine block containing data
 */
module.exports.mine = (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);
  
    // Sync all chains - making a decentralized system
    p2pServer.syncChains();
  
    res.redirect('/blocks');
};
  
module.exports.transactions =  (req, res) => {
    res.json(tp.transactionList);
};

module.exports.transact = (req, res) => {
    const {recipient, amount} = req.body;
    const transaction = wallet.createTransaction(recipient, amount, bc, tp);

    p2pServer.broadcastTransaction(transaction);

    res.redirect('/transactions');
};

module.exports.blocks = (req, res) => {
    res.json(bc.chain);
};

module.exports.publicKey =  (req, res) => {
    res.json(wallet.publicKey);
    console.log({"publicKey": [wallet.publicKey]});
};
  
module.exports.balance = (req, res) => {
    balance = wallet.calculateBalance(bc);
    res.json(balance);
    console.log(balance);
}; 

module.exports.listen = (req, res) => {
    p2pServer.listen();
}