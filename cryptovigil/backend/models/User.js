const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
});
const ipSchema = new mongoose.Schema({
  ip: { type: String, required: true},
 
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('VALIDIP', ipSchema);
