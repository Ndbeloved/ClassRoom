const express = require('express')
const router = express.Router()
const departmentController = require('../contollers/departmentController')

router.post('/create', departmentController.create)

module.exports = router