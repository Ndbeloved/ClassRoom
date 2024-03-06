const mongoose = require('mongoose')

const DeptSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deptID: {
        type: String,
        required: true,
        unique: true
    },
    courseRepID:{
        type: String,
        required: true
    },
    listed: [String]
})



module.exports = new mongoose.model('department', DeptSchema)