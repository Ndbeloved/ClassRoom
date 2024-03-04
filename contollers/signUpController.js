const Password = require('../Utils/passwordHash')
const User = require('../services/UserService')

const signUp = async function(req, res){
    try{
        const {email, password, username} = req.body
        const userPassword = new Password()
        const hashedPassword = await userPassword.hash(password)
        const newUser = new User()
        const result = await newUser.createNew(email, username, hashedPassword.hash, hashedPassword.salt)
        console.log(result)
        if(!result) return res.status(403).json({message: "unsuccessful", status: 403})
        res.status(200).json({message: "successful", status :200})
    }
    catch(err){
        console.log(err)
    }
}

const login = async function(req, res){
    const {email, password, username} = req.body
}


module.exports = {
    signUp,
    login,
}