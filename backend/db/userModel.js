const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, "Please provide an username"],
        unique: [true, "Username exists"]
    },
    passphrase: {
        type: 'string',
        required: [true, "Please provide a passphrase"],
    },
    publicKey: {
        type: 'string',
    },
    privateKey: {
        type: 'string',
    },
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
