const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aadhaar: { type: String, required: true },
  iv: { type: String, required: true },
  verificationToken: { type: String },
  verified: { type: Boolean, default: false }, // Add this field
});

module.exports = mongoose.model('User', userSchema);
