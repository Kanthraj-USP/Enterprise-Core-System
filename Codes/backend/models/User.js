const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  role: {
    type: String
  },
  phone_number: {
    type: Number
  },
  mobile: {
    type: Number
  }
});

module.exports = User = mongoose.model('user', UserSchema);