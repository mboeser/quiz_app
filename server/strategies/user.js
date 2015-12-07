var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            //console.log('stag USER file log', id);
            User.findById(id, function (err, user) {
                    if (err) done(err);
                    done(null, user);
                    //});
                    //}
                }
            )
        }
        done(null);
    }
);

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function (req, username, password, done) {

    User.findOne({username: username}, function (err, user) {
        if (err) throw err;
        if (!user) return done(null, false, {message: 'Incorrect username and password'});
        user.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                done(null, false, {message: 'Incorrect username and password'});
            }
        });
    });
}));

//module.exports = passport;