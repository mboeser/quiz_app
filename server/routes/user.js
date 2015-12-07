var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    //console.log("MADE IT HERE", req);
    res.send(req.user);
});

module.exports = router;