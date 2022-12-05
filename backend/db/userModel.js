const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    passphrase: { type: String, required: true },
    publicKey: { type: String },
    
});

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.passphrase = await bcrypt.hash(this.passphrase, salt);
    next();
  });
  
UserSchema.statics.login = async function (username, passphrase) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(passphrase, user.passphrase);
      if (auth) {
        return user;
      }
      throw Error("incorrect passphrase");
    }
    throw Error("incorrect username");
  };

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
