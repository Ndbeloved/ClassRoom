const mongoose = require('mongoose')

const dbConnect = async(APP)=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        APP.listen(process.env.PORT, ()=>{
            console.log('connected to db successfully');
            console.log(`server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err)=>{
        console.log('Error trying to connect to db')
    })
}

module.exports = dbConnect