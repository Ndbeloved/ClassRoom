require('dotenv').config()
const express = require('express')
const app = express()

const dbConnect = require('./services/dbConnectService')

const signUpRoute = require('./routes/signUpRoute')

app.use(express.json())
app.use('/auth', signUpRoute)

//handles connection to db and spinning up server
dbConnect(app)

//handles 404
app.use((req,  res)=>{
    res.status(404).json({message: "page not found", status: 404})
})