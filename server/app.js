var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var session = require('express-session');
var passport = require('./strategies/user');

var register = require('./routes/register');
var user = require('./routes/user');
var index = require('./routes/index');


app.use(morgan('dev'));

// App Port //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Config //

app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);


// Mongo Connection //


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


var mongoURI = 'mongodb://localhost/quiz_app';
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    if (err) console.log("mongo error", err);
});

mongoDB.once('open', function(){
    console.log("Connected to mongo, meow");
});

var Quiz = mongoose.model('quiz', new Schema({ quiz: Object}));

app.get("/admin", isLoggedIn, function(req,res){
    console.log(req.user._id);
    Quiz.find({"quiz.userId" : String(req.user._id)}, null, {sort:{"_id": 1}}, function(err, data){
        if(err) console.log(err);
        console.log(data);
        res.send(data);
    });
});

app.post("/admin", isLoggedIn, function(req,res){
    //console.log(req.body);
    new Quiz({quiz: req.body})
        .save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    })
});

app.delete('/admin', isLoggedIn, function(req, res){
    //console.log(req.query.id);

    Quiz.findByIdAndRemove({"_id" : req.query.id}, function(err, data){
        if(err) console.log (err);
        res.send(data);
    });
});

app.put('/admin', isLoggedIn, function(req, res){
    Quiz.findOneAndUpdate({"_id" : req.body.id}, {'quiz':req.body}, function(err, data){
        if(err) console.log (err);
        res.send(data);
    });
});

// Send Static Files //

app.get("/quiz", function(req, res, next) {
    var file = req.params[0] || 'views/quiz.html';
    res.sendFile(path.join(__dirname, "./public", file));
});

app.use('/', index);

app.get("/*", isLoggedIn, function(req, res, next) {
    //console.log(req.cookie, req.session);
    var file = req.params[0] || 'views/auth/index.html';
    res.sendFile(path.join(__dirname, "./public", file));
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
