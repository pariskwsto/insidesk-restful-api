const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please add a username'],
    minLength: [2, 'Username can not be less than 2 characters'],
    maxLenth: [60, 'Username can not be more than 60 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
    maxLenth: [100, 'Email can not be more than 100 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  first_name: {
    type: String,
    maxLenth: [60, 'First name can not be more than 60 characters'],
  },
  last_name: {
    type: String,
    maxLenth: [60, 'Last name can not be more than 60 characters'],
  },
  dob: Date,
  role: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
  reset_password_token: String,
  reset_password_expire: Date,
  confirmed_email: {
    type: Boolean,
    default: false,
  },
  confirm_email_token: String,
  two_factor_enable: {
    type: Boolean,
    default: false,
  },
  two_factor_code: String,
  two_factor_code_expire: Date,
  create_time: {
    type: Date,
    default: Date.now,
  },
  update_time: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate and hash password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash token and set to reset_password_token field
  this.reset_password_token = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // set expire (10min)
  this.reset_password_expire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// generate email confirm token
UserSchema.methods.generateEmailConfirmToken = function (next) {
  // email confirmation token
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  this.confirm_email_token = crypto
    .createHash('sha256')
    .update(confirmationToken)
    .digest('hex');

  const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
  const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;

  return confirmTokenCombined;
};

module.exports = mongoose.model('User', UserSchema, 'users');
