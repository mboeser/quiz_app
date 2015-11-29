var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set Port //
app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/quiz_app');

var Quiz = mongoose.model('quiz', new Schema({ quiz: Object}));

app.get("/admin", function(req,res){
    //console.log(req);
    Quiz.find({}, function(err, data){
        if(err) console.log(err);
        //console.log(data);
        res.send(data);
    });
});

app.post("/admin", function(req,res){
    console.log(req.body);
    new Quiz({quiz: req.body})
        .save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    })
});

app.delete('/admin', function(req, res){
    //console.log(req.query.id);

    Quiz.findByIdAndRemove({"_id" : req.query.id}, function(err, data){
        if(err) console.log (err);
        res.send(data);
    });
});

app.put('/admin', function(req, res){
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

app.get("/*", function(req, res, next) {
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "./public", file));
});

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});