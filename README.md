# Data Coin | P2P Cryptocurrency Web App

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

![alt text](https://github.com/candilikoglu/datacoin2.0/blob/master/DATA%20PIRATES%20LOGO.png)

## Downloading

```bash
$ git clone https://github.com/candilikoglu/datacoin2.0.git
```

> This app is a backend that mimics a peer to peer payment system (like Bitcoin), with a fully functional wallet, attached to the local miner, but with transactions and the blockchain synced across the distributed system of nodes

## Pre-requisities:

> Some key things to set up / understand to use this app:

- **[NodeJS v9](https://nodejs.org/en/)**
- **[npm](https://www.npmjs.com/)**

## Setup Locally

> To get the app working locally, or to run test cases, follow the instructions below.
> After setting up the app, details on each API and how to use it can be found below in the **[API's available on this app](https://github.com/candilikoglu/datacoin2.0#apis-available-on-this-app)** section.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Open two terminals

2. Navigate into backend

3. Run npm install on both directories

```bash
$ npm install
```

4. To start the node execute npm run dev in backend folders

```bash
$ npm run dev
```

5. To start the web application execute npm start in frontend folder

```bash
$ npm start
```

## Run test cases:

```bash
$ npm run test
```

## API's available on this app

> This app supports 6 API's currently: (3001 can be changed to any of the other node's HTTP server's port number)

1. GET <a href="http://localhost:3001/blocks" target="_blank">/blocks</a>

   - Fetch the blocks in the blockchain saved locally on the node whose HTTP server is running on port 3001

2. POST <a href="http://localhost:3001/mine" target="_blank">/mine</a>

   - Mines a new block containing the data field in the post request
   - The block is then added to the blockchain locally
   - The updated blockchain is broadcasted across the network so that other nodes can update their blockchains

3. GET <a href="http://localhost:3001/transactions" target="_blank">/transactions</a>

   - Fetch all transactions in the transactions pool saved locally in the node
   - The transaction pool is the same and is saved across all nodes in the network

4. POST <a href="http://localhost:3001/transact" target="_blank">/transact</a>

   - Takes in recipient and amount as post parameters
   - This endpoint is used to send amount to recipient from wallet at 3001
   - Creates a new transaction and adds it to the transaction pool
   - Wallet at 3001 has amount subtracted, and recipient wallet gets amount added to balance

5. GET <a href="http://localhost:3001/public-key" target="_blank">/public-key</a>

   - This endpoint is used to retrieve public key for the wallet at port 3001
   - This public key must be used as recipient to send wallet at 3001 currency

6. GET <a href="http://localhost:3001/mine-transactions" target="_blank">/mine-transactions</a>

   - Mines a new block containing all the transactions in the transaction pool shared across all nodes in the network
   - The block is mined based on the **[proof of work](https://github.com/mayankamencherla/Blockchain#proof-of-work)** mechanism also used in Bitcoin.
   - The block is then added to the blockchain locally
   - The updated blockchain is broadcasted across the network so that other nodes can update their blockchains

7. Post <a href="http://localhost:3001/login" target="_blank">/login</a>

8. Post <a href="http://localhost:3001/register" target="_blank">/register</a>

9. Post <a href="http://localhost:3001/balance" target="_blank">/balance</a>

## Proof of work

> The miner creats a new block using the proof of work mechanism outlined below

1. When the miner decides to mine a new block, he does so with all the transactions in the transaction pool
2. The initial block is a genesis block, and a new block is mined based on the following parameters:

```
    a. block of the last hash
    b. nonce
    c. hash of the current block
    d. timestamp
    e. difficulty
```

3. The proof of work mechanism iteratively increases nonce and alters difficulty, until the number of leadings 0's in the block's hash are equal to the difficulty in the current iteration
4. This is done to ensure that each block is added once every `MINE_RATE` of the blockchain
5. The algorithm can be found in **[mine block](https://github.com/candilikoglu/datacoin2.0/blob/master/backend/blockchain/block.js#L38)**
