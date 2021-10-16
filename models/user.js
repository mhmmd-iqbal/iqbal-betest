const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  accountNumber: String,
  emailAddress: String,
  identifyNumber: String,
  password: String,
});

module.exports = mongoose.model('users', userSchema);
