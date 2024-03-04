require('dotenv').config()
const express = require('express')
const app = express()

const dbConnect = require('./services/dbConnectService')

app.use(express.json())

dbConnect(app)