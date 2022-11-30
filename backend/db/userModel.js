const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: 'string', required: true, unique: true },
    passphrase: { type: 'string', required: true },
    publicKey: { type: 'string' },
    privateKey: { type: 'Buffer'},
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
