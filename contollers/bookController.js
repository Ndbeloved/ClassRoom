const BOOKmodel = require('../models/BookModel')
const DEPTmodel = require('../models/DEPTmodel')

const listBook = async function(req, res){
    try{
        const {departmentID} = req.params
        const department = await DEPTmodel.findOne({deptID: departmentID})
        if(!department) return res.status(403).json({message: "failed to find department"})
        const {name, uploaderID, price, deptID} = req.body
        const BookModel = await BOOKmodel.create({
            name,
            uploaderID,
            price,
            deptID,
        })
        const departmentUpdate = await DEPTmodel.findOneAndUpdate({deptID: departmentID}, {$push: {listed: BookModel._id}})
        res.status(200).json({message: "successfully added book"})
    }
    catch(err){
        res.status(500).json({message: "error trying to add book"})
    }
}



module.exports = {
    listBook,
}