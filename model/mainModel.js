const mongoose = require('mongoose');
const User = require("./userModel");


const detailsSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
    },

    F_name:{
        type: String,
        
    },

    company:{
        type: String,
    },

    phone_no:{
        type: String,
    },

    description:{
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }


},{timestamps:true});

module.exports = mongoose.model('Details', detailsSchema)