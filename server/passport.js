const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./config/config');
const User = require('./models/User');

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, (payload, done) => {
    User.findById(payload.sub)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(err => done(err, false))
}))


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email',
}, (email, password, done) => {
    User.findOne(email)
        .then(user => {
            if (!user) { return done(null, false) }
        })
        .catch(err => done(err, false))
})) 
