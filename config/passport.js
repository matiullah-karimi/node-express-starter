const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model');
const passport = require('passport');

module.exports = function () {
    setupLocalStrategy();
    setupJwtStrategy();

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => done(err, await User.findById(id)));
}

/**
 * Setup local strategy
 */
function setupLocalStrategy() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }).select('+password');
        }
    ));
}

/**
 * Setup jwt strategy
 */
function setupJwtStrategy() {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
        secretOrKey: process.env.JWT_SECRET,
    }

    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        User.findById(jwt_payload._id, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}