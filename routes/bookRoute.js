const express = require('express')
const bookController = require('../contollers/bookController')
const router = express.Router()


router.post('/list/:departmentID', bookController.listBook)

router.get('/book/:id', bookController.getBook)


module.exports = router