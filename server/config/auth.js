// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : process.env.FACEBOOK_ID, // your App ID
        'clientSecret'    : process.env.FACEBOOK_SECRET, // your App Secret
        'callbackURL'     : 'https://quizadminapp.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : process.env.TWITTER_KEY,
        'consumerSecret'     : process.env.TWITTER_SECERT,
        'callbackURL'        : 'https://quizadminapp.herokuapp.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : process.env.GOOGLE_ID,
        'clientSecret'     : process.env.GOOGLE_SECRET,
        'callbackURL'      : 'https://quizadminapp.herokuapp.com/auth/google/callback'
    }

};
