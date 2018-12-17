const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config');

const tokenForUser = user => {
  const iat = new Date().getTime();
  return jwt.sign({ sub: user.id, iat }, secret, { expiresIn: '1h' });
};

const signin = async (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};

const signup = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: 'Email is in use' });
    }
    password = await bcrypt.hash(password, 12);
    user = new User({ email, password });
    user = await user.save();
    res.json({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin
};
