const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/schema/user').User;
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

function configurePassport(passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          console.log('user found ' + jwt_payload.id);
          return done(null, user);
        }
        console.log('no user found ' + jwt_payload.id);
        return done(null, false);
      })
      .catch(err => {
        console.error(err);
        return done(err, false)
      });
    })
  );
};


module.exports = configurePassport;
