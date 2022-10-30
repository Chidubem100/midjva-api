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
    firstName: {
        type: String,
        required: [true, 'Please provide your first name'],
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name'],
        minlength: 3,
        maxlength: 20
    },
    company: {
        type: String,
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
    return jwt.sign({userId: this._id, firstName: this.firstName, lastName: this.lastName, company: this.company},
    JWTSCRET,{ expiresIn: '30d'});
}

// hash password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

userSchema.methods.getfirstName = function(){
    return this.firstName
}



module.exports = mongoose.model('User', userSchema);