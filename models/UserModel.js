const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    isCourseRep:{
        type: Boolean,
        default: false,
        immutable: true,
    },
    balance: {
        type: Number,
        default: 0,
        immutable: true,
    },
    salt: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('user', userSchema)