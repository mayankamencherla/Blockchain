const router = require('express').Router();

const { register, login } = require("../controllers/authControllers")
const { checkUser } = require("../middlewares/authMiddleware");

router.post("/", checkUser)
router.post("/register", register);
router.post("/login", login);

module.exports = router;