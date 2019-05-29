const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let User = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    username: {
    	type: String
    },
    email: {
    	type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    created: {
    	type: Date
    },
    profileimage: {
        type: String
    },
});

module.exports = mongoose.model('User', User);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}