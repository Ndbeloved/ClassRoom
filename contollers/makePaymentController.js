const initializePayment = require("../services/PayStackService")

const makePayment = async function(req, res){
    const {emailSender, amount, BookID, Dept} = req.body
    const paymentError = await initializePayment.acceptPayment(req, res, parseInt(amount), emailSender)
    if(!paymentError) return res.status(500).json({message: "Error while processing payment"})
    const responseJson = JSON.parse(paymentError) //receives string json, need to convert it to proper json
    const transactionReference = responseJson.data.reference
    res.status(200).json({message: "success", status: 200, transactionReference, responseJson})
}

const confirmPayment = async function(req, res){
    const {reference} = req.params
    const transactionData = await initializePayment.verifyPayment(reference)
    const responseJson = JSON.parse(transactionData)
    const receiverID = responseJson.data.metadata.custom_fields[0].receiver
    const amountPaid = responseJson.data.amount / 100
    console.log('amount: ',amountPaid)
    console.log('receiverId: ',receiverID)
    res.status(200).json({message: "success"})
}

const paystackWebhook = async(req, res) =>{
    const event = req.body
    console.log(event.event)
}


module.exports = {
    makePayment,
    confirmPayment,
    paystackWebhook
}