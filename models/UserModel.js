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
    },
    salt: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true,
    },
    booksReceived: [String],    //keeps track of books yet to be received 
    isSuperUser:{
        type: Boolean,
        default: false,
        immutable: true,
    }
})

module.exports = new mongoose.model('user', userSchema)