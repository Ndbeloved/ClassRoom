const mongoose = require("mongoose");

const TransactionsSchema = mongoose.Schema({
    receiverID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model('transactions', TransactionsSchema)