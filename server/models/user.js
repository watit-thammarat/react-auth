const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserScheam = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('user', UserScheam);
