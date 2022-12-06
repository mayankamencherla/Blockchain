const router = require('express').Router();

const { register, login } = require("../controllers/authControllers")
const { checkUser } = require("../middlewares/authMiddleware");
const { mine, mineTransactions } = require("../controllers/miningControllers")

// Authentication routers
router.post("/", checkUser)
router.post("/register", register);
router.post("/login", login);

// Mining routers
router.get("/mine",  mineTransactions);
router.post("/mine", mine)

module.exports = router;