const Transaction = require("../Utils/TransactionClass")
const DEPTmodel = require("../models/DEPTmodel")
const UserModel = require("../models/UserModel")
const initializePayment = require("../services/PayStackService")

const makePayment = async function(req, res){
    const {emailSender, amount, BookID, DeptID} = req.body
    //change senderId later
    const SenderID = '3iieeeneiid'
    const paymentError = await initializePayment.acceptPayment(req, res, parseInt(amount), emailSender, BookID, DeptID, SenderID)
    if(!paymentError) return res.status(500).json({message: "Error while processing payment"})
    const responseJson = JSON.parse(paymentError) //receives string json, need to convert it to proper json
    const transactionReference = responseJson.data.reference
    res.status(200).json({message: "success", status: 200, transactionReference, responseJson})
}

//on payment success, error, abandoned handler
const paystackWebhook = async(req, res) =>{
    const event = req.body
    if(event.event === 'charge.success'){
        console.log('successful payment')
        const metadata = event.data.metadata.custom_fields[0]
        const Dept = await DEPTmodel.findOne({_id: metadata.department})
        if(!Dept) return console.log('couldnt find department')
        //if department was found, get courseRep's id and update balance
        const courseRepID = Dept.courseRepID
        const amountPaid = event.data.amount / 100
        const BookID = metadata.item
        const senderID = metadata.sender
        const courseRep = await UserModel.findOneAndUpdate({_id: courseRepID},{ $inc:{balance:amountPaid}})
        const recordTransaction = new Transaction()
        recordTransaction.receive(senderID, courseRepID, BookID, amountPaid)
        if(recordTransaction){console.log('transaction recorded')}
    }
    //needed by paystack inorder to stop sending payment status
    res.sendStatus(200)
}


module.exports = {
    makePayment,
    paystackWebhook
}