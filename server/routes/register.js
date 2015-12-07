var express = require('express');
var router = express.Router();
var path = require('path');
var Users = require('../models/user');
var passport = require('passport');

router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/views/auth/register.html'));
});

//router.post('/', function(req,res,next){
//    Users.create(req.body, function(err,post){
//        if(err){
//            next(err);
//        } else {
//            res.redirect('/');
//        }
//    });
//});

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/failure', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;