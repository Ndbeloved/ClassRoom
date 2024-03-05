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
    }
})



module.exports = new mongoose.model('department', DeptSchema)