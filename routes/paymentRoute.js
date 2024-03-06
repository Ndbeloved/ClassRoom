const express = require('express')
const router = express.Router()

const makePaymentController = require('./../contollers/makePaymentController')

router.post('/auth/payment', makePaymentController.makePayment)

router.post('/auth/webhook', makePaymentController.paystackWebhook)


module.exports = router