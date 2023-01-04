const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true,    
    },
    fullName: {
        type: String,
        required: [true, 'Please provide your fullname'],
        minlength: 3,
        maxlength: 20
    },
    userName: {
        type: String,
        default: 'my username',
        minlength: 3,
        maxlength: 20,
        unique: true,
    },
    company: {
        type: String,
        default: 'my company',
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        minlength: 6
    },
});

// create token
userSchema.methods.createJwt = function(){
    return jwt.sign({userId: this._id, fullName: this.fullName, userName: this.userName, company: this.company},
        process.env.JWT_SECRET,
    { 
        expiresIn: process.env.JWT_LIFETIME
    });
}

// hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

// compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

userSchema.methods.getUserName = function(){
    return this.userName
}



module.exports = mongoose.model('User', userSchema);