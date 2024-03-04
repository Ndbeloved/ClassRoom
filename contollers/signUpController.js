const Jwt = require('../Utils/Jwt')
const Password = require('../Utils/passwordHash')
const User = require('../services/UserService')

const signUp = async function(req, res){
    try{
        const {email, password, username} = req.body
        const userPassword = new Password()
        const hashedPassword = await userPassword.hash(password)
        const newUser = new User()
        const result = await newUser.createNew(email, username, hashedPassword.hash, hashedPassword.salt)
        if(!result) return res.status(403).json({message: "unsuccessful", status: 403})
        res.status(200).json({message: "successful", status :200})
    }
    catch(err){
        console.log(err)
    }
}

const login = async function(req, res){
    const {email, password} = req.body
    const userObj = new User()
    const user = await userObj.isUser(email)
    if(!user) return res.status(403).json({message: "incorrect email or password", status: 403})
    const passwordObj = new Password()
    const hashedPassword = await passwordObj.decrypt(user.salt, password, user.password)
    console.log(hashedPassword)
    if(!hashedPassword) return res.status(403).json({message: "incorrect email or password", status: 403})
    const signedUser = new Jwt()
    const token = signedUser.sign(user)
    if(!token) return res.status(500).json({message: "unexpected error trying to sign jwt", status: 500})
    res.status(200).json({message: "success", status: 200, token: token})
}


module.exports = {
    signUp,
    login,
}