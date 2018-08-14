# Blockchain and CryptoCurrency from scratch

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

## Downloading
```bash
$ git clone https://github.com/mayankamencherla/Blockchain.git
```

> This app is a backend that mimics a peer to peer payment system (like Bitcoin), with a fully functional wallet, attached to the local miner, but with transactions and the blockchain synced across the distributed system of nodes

## Pre-requisities:
> Some key things to set up / understand to use this app:

- **[NodeJS v9](https://nodejs.org/en/)**
- **[npm](https://www.npmjs.com/)**
- **[Bitcoin](https://bitcoin.org/bitcoin.pdf)**

## Setup Locally
> To get the app working locally, or to run test cases, follow the instructions below.
> After setting up the app, details on each API and how to use it can be found below in the **[API's available on this app](https://github.com/mayankamencherla/Blockchain#apis-available-on-this-app)** section.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Navigate to the app's root directory

2. Run the following command to install all the dependencies:
```bash
$ npm install
```

3. Open the first node on the network:
```bash
$ npm run dev
```
By default, the first node's HTTP server is hosted on port 3001, and the P2P server is hosted on port 5001

4. Open the second node on the network:
```bash
$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
```
This opens a new node, with an HTTP server hosted on port 3002, and the P2P server hosted on 5002, and it connects to the peers in the network (In this case, only 1 hosted on port 5002)

5. To open the nth node on the network:
  a. Choose 2 open ports, 1 for the HTTP server, and 1 for the P2P server of the node
  b. PEERS = n-1 P2P servers that were created before this node in the form: ws://localhost:<port>, seperated by commas
```bash
$ HTTP_PORT=<HTTP PORT> P2P_PORT=<P2P PORT> PEERS=<ws://localhost:<PORT1>,ws://localhost:<PORT2>...> npm run dev
```

## Run test cases:
```bash
$ npm run test
```

## API's available on this app
> This app supports 6 API's currently

1. GET <a href="http://localhost:3000/blocks" target="_blank">/blocks</a>

2. GET <a href="http://localhost:3000/mine" target="_blank">/mine</a>

3. GET <a href="http://localhost:3000/transactions" target="_blank">/transactions</a>

4. GET <a href="http://localhost:3000/transact" target="_blank">/transact</a>

5. GET <a href="http://localhost:3000/public-key" target="_blank">/public-key</a>

6. GET <a href="http://localhost:3000/mine-transactions" target="_blank">/mine-transactions</a>
