const mongoose = require('mongoose');


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
        required: true,
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
    }
});

module.exports = mongoose.model('Details', detailsSchema)