var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
        consumerKey: 'P4kHviinnyWFDLvjzbW4jNrVl',
        consumerSecret: 'bRhIhmNcTwp5qXhgsPaFc7LtF8Xc53w2Qrqpt9J9iMdijQaHxx',
        callbackURL: "http://127.0.0.1:5000/auth/twitter/callback"
    },
    //function(token, tokenSecret, profile, done) {
    //    console.log('here', token);
    //    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //        return done(err, user);
    //    });
    //}
    function(token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

//module.exports = passport;