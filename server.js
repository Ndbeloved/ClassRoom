require('dotenv').config()
const express = require('express')
const app = express()

const dbConnect = require('./services/dbConnectService')

const signUpRoute = require('./routes/signUpRoute')
const paymentRoute = require('./routes/paymentRoute')
const departmentRoute = require('./routes/departmentRoute')
const bookRoute = require('./routes/bookRoute')

app.use(express.json())
app.use('/auth', signUpRoute)
app.use('/paystack', paymentRoute)
app.use('/department', departmentRoute)
app.use('/books', bookRoute)

//handles connection to db and spinning up server
dbConnect(app)

//handles 404
app.use((req,  res)=>{
    res.status(404).json({message: "page not found", status: 404})
})