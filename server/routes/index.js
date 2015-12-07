var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

//function isLoggedIn(req, res, next) {
//    if (req.isAuthenticated()) {
//        return next();
//    }
//    res.redirect('/');
//}


router.post('/',
    passport.authenticate('local-login', {
        successRedirect: '/views/index.html',
        failureRedirect: '/views/auth/failure.html'
    }));

//router.post('/test', function(req,res){
//console.log(req);
//});

router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/auth/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;