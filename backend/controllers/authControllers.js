const User = require("../db/userModel");
const jwt = require("jsonwebtoken");
const ChainUtil = require('../chain-util');


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "data coin secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { username: "", passphrase: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.username = "That username is not registered";
  }

  if (err.message === "incorrect password") {
    errors.passphrase = "That passphrase is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "Username is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const publicKey = ChainUtil.genKeyPair().getPublic().encode('hex')
    const { username, passphrase } = req.body;
    const user = await User.create({ username, passphrase, publicKey });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { username, passphrase } = req.body;
  try {
    const user = await User.login(username, passphrase);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};