const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uploaderID: {   //name of representative that listed a book 
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    deptID: {
        type: String,
        required: true
    },
    paidID: [String]
})

module.exports = new mongoose.model('books', BookSchema)