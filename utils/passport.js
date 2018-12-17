const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const keys = process.env.SECRET_KEY;

const authObject = {};

authObject.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
authObject.secretOrKey = keys;

module.exports = (passport) => {
    
    passport.use(new JwtStrategy(authObject, (jwt_payload, done) => {

        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => console.log(err));

    }));

}