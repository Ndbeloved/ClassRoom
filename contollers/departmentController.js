const DeptModel = require('../models/DEPTmodel')

const create = async(req, res)=>{
    try{
        const {ID, departmentName} = req.body
        //function to create randomID
        const department = DeptModel.create({
            name: departmentName,
            deptID: '4fJhu0',
        })
        res.status(200).json({message: "success creating a department"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "error trying to create department"})
    }
}

module.exports = {
    create
}