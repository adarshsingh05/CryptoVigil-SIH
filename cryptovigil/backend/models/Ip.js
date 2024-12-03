
const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
    ip: { type: String, required: false},
   
  });
  module.exports = mongoose.model('VALIDIP', ipSchema);
  