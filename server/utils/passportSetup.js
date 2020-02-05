/* eslint-disable consistent-return */
const JwtStrategy = require('passport-jwt').Strategy; // JwtStrategy
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const { secretOrKey } = require('./config');

// User model
const User = require('../models/User');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
}, async (jwtPayload, done) => {
  try {
    const { userID } = jwtPayload;
    const user = await User.findById(userID);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));
