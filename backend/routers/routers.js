const router = require('express').Router();

const { register, login } = require("../controllers/authControllers")
const { checkUser } = require("../middlewares/authMiddleware");
const { mine, mineTransactions } = require("../controllers/blockchainControllers")
const { transactions, transact } = require("../controllers/blockchainControllers")
const { balance, publicKey, blocks} = require("../controllers/blockchainControllers")

// Authentication routers
router.post("/", checkUser)
router.post("/register", register);
router.post("/login", login);

// Mining routers
router.get("/mine",  mineTransactions);
router.post("/mine", mine)

// Transaction routers
router.get("/transactions", transactions)
router.post("/transact", transact)

// Blockchain routers
router.get("/balance", balance)
router.get("/publicKey", publicKey)
router.get("/blocks", blocks)


module.exports = router;