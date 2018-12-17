const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { secret } = require('../config');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const localOptions = { usernameField: 'email' };

passport.use(
  new JwtStrategy(jwtOptions, async ({ sub }, done) => {
    try {
      const user = await User.findById(sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);
