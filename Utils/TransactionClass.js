const TransactionsModel = require("../models/TransactionsModel");

class Transaction{
    constructor(){
        //
    }
    async receive(senderID, receiverID, BookID, amount){
        try{
            const newTransaction = await TransactionsModel.create({
                receiverID,
                senderID,
                BookID,
                amount
            })
            return true
        }
        catch(err){
            console.log(err)
            return(false)
        }
    }

    async get(id){
        try{
            const TransactionDetails = await TransactionsModel.findOne({_id: id})
            return TransactionDetails
        }catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = Transaction