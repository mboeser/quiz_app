var express = require("express");
var favicon = require('serve-favicon');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');

//var passport = require('./strategies/user');
//var passportFacebook = require('./strategies/facebook');
//var passportTwitter = require('./strategies/twitter');
//var passportGoogle = require('./strategies/google');

require('./config/passport')(passport); // pass passport for configuration

var register = require('./routes/register');
var user = require('./routes/user');
var index = require('./routes/index');

app.use(morgan('dev'));

// App Port //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Config //
//app.use(express.static('public'));

//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
app.use('/register', register);
app.use('/user', user);


// Mongo Connection //


//function isLoggedIn(req, res, next) {
//    if (req.isAuthenticated()) {
//        return next();
//    }
//    res.redirect('/');
//}


var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/quiz_app2';
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function (err) {
    if (err) console.log("mongo error", err);
});

mongoDB.once('open', function () {
    console.log("Connected to mongo, meow");
});

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' }),
    function (req, res) {
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        // , {scope: 'email'}
    });

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/views/auth/failure'}),
    function (req, res) {
        console.log('before success redirect');
        res.redirect('/views/index.html');
    });

app.get('/auth/twitter',
    passport.authenticate('twitter'),
    function (req, res) {
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        // , {scope: 'email'}
    });

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: '/views/auth/failure'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/views/index.html');
    });

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}),
    function (req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called. ['https://www.googleapis.com/auth/plus.login']
    });

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/views/auth/failure'}),
    function (req, res) {
        res.redirect('/views/index.html');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

var Quiz = mongoose.model('quiz', new Schema({quiz: Object}));

app.get("/admin", function (req, res) {
    console.log('get request', req.user._id);
    Quiz.find({"quiz.userId": String(req.user._id)}, null, {sort: {"_id": 1}}, function (err, data) {
        if (err) console.log(err);
        console.log(data);
        res.send(data);
    });
});

app.post("/admin", function (req, res) {
    //console.log(req.body);
    new Quiz({quiz: req.body})
        .save(function (err, data) {
            if (err) console.log(err);
            res.send(data);
        })
});

app.delete('/admin', function (req, res) {
    //console.log(req.query.id);

    Quiz.findByIdAndRemove({"_id": req.query.id}, function (err, data) {
        if (err) console.log (err);
        res.send(data);
    });
});

app.put('/admin', function (req, res) {
    Quiz.findOneAndUpdate({"_id": req.body.id}, {'quiz': req.body}, function (err, data) {
        if (err) console.log (err);
        res.send(data);
    });
});

// Send Static Files //

app.get("/quiz", function (req, res) {
    var file = req.params[0] || 'views/quiz.html';
    res.sendFile(path.join(__dirname, "./public", file));
});

app.use('/', index);

app.get("/*", function (req, res) {
    //console.log(req.cookie, req.session);
    var file = req.params[0] || 'views/auth/index.html';
    res.sendFile(path.join(__dirname, "./public", file));
});

// Listen //
app.listen(app.get("port"), function () {
    console.log("Listening on port: " + app.get("port"));
});