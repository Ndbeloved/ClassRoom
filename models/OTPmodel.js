const mongoose = require('mongoose')

const OTP = mongoose.Schema({
    userID: {
        type: String,
        required: true
    }, 
    value: {
        type: String,
        required: true
    },
    emailVerification:{
        type: Boolean,
        default: false
    },
    passwordReset: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type: Date,
        default: Date.now,
        immutable: true
    },
    expiresAt:{
        type: Date,
        default: ()=>{Date.now()},
        immutable: true
    },
    modifiedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('otp', OTP)