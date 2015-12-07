var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: '708840212400-88lvkvkhf3bbscldhq5ib98a166tjc6e.apps.googleusercontent.com',
        clientSecret: 'KVgUQZZOB0UTHmFfdqof252U',
        callbackURL: "http://localhost:5000/auth/google/callback"
    },
//    function(accessToken, refreshToken, profile, done) {
//        User.findOrCreate({ googleId: profile.id }, function (err, user) {
//            return done(err, user);
//        });
//    }
//));

function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
}
));

//module.exports = passport;