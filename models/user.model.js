const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../config/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: false
  },
  role: {
    required: true,
    type: String,
    enum: [...Object.values(roles)]
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id, name: this.name, email: this.email}, process.env.JWT_SECRET);
  return token;
}

userSchema.methods.validPassword = function (password) {
  const validPassword = bcrypt.compareSync(password, this.password);

  return validPassword == true;
};

userSchema.methods.isAdmin = function () {
  return this.role == roles.ADMIN;
}

userSchema.methods.isDataEntry = function () {
  return this.role == roles.DATA_ENTRY;
}

userSchema.methods.isReviewer = function () {
  return this.role == roles.REVIEWER;
}

module.exports = mongoose.model('User', userSchema);