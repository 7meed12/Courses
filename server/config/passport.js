const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require('../config/keys');
const PUB_KEY =key.secretOrKey


const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : PUB_KEY
};
const strategy = new JwtStrategy(options, (payload, done) => {
    
    User.findByPk(payload.sub).then(user => {
            if(user)  return done(null, user);
            else {
                console.log('fired');
                return done(null.false)};

    }).catch(err => done(err,false))
})


module.exports = (passport) => {
    passport.use(strategy);  
}