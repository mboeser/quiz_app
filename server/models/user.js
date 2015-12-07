var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema({
    //username: {type: String, required: true, index: {unique: true}},
    //password: {type: String, required: true}

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});



//UserSchema.pre('save', function(next){
//    var user = this;
//    console.log('got to model users');
//
//    if(!user.isModified('password')) return next;
//
//    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//        if(err) return next(err);
//
//        bcrypt.hash(user.password, salt, function(err, hash){
//            if(err) return next(err);
//
//            user.password = hash;
//            next();
//        });
//    });
//});
//
//UserSchema.methods.comparePassword = function(candidatePassword, cb){
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//        if(err) return cb(err);
//        cb(null, isMatch);
//    });
//};

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
