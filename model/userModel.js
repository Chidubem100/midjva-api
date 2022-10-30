const mongoose = require('mongoose');

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






module.exports = mongoose.model('User', userSchema);