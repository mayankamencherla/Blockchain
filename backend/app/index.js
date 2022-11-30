const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ChainUtil = require('../chain-util');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');
const dbCoonect = require('../db/dbConnect');
const User = require('../db/userModel');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();
const bc = new Blockchain();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const wallet = new Wallet();
// A miner consisting of the local blockchain, transaction pool, currency wallet and the p2pServer
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.json());
app.use(cors())

dbCoonect()
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
 
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


// login endpoint
app.post("/login", (request, response) => {
  // check if username exists
  User.findOne({ username: request.body.username })

    // if username exists
    .then((user) => {
      // compare the passphrase entered and the hashed passphrase found
      bcrypt
        .compare(request.body.passphrase, user.passphrase)

        // if the passwords match
        .then((passphraseCheck) => {

          // check if password matches
          if(!passphraseCheck) {
            return response.status(400).send({
              message: "Passphrase does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            username: user.username,
            passphrase: user.passphrase,
            publicKey: user.publicKey.toString(),
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.passphrase, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        username: request.body.username,
        passphrase: hashedPassword,
        publicKey: ChainUtil.genKeyPair().getPublic().encode('hex')
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//mongoose.connection.once('open', () => {
  app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
  p2pServer.listen();
//})

