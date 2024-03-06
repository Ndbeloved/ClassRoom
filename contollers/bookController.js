const BOOKmodel = require('../models/BookModel')
const DEPTmodel = require('../models/DEPTmodel')

const listBook = async function(req, res){
    try{
        //check if uploader is courseRep
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

const getBook = async function(req, res){
    try{
        const {id} = req.params
        console.log(id)
        const book = await BOOKmodel.findOne({_id: id})
        res.status(200).json({message: "success", book})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "error finding book"})
    }
}



module.exports = {
    listBook,
    getBook,
}