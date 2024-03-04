const express = require('express')
const router = express.Router()

const controller = require('./../contollers/signUpController')

router.post('/signin', controller.signUp)

router.post('/login', controller.login)

module.exports = router