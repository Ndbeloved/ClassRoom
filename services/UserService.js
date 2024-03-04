const mongoose = require('mongoose')
const UserModel = require('./../models/UserModel')

class User{
    constructor(){
        //
    }

    //create new user
    async createNew(email, username, password, salt){
        try{
            await UserModel.create({
                email,
                username,
                password,
                salt
            })
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }

    //drop a user from the database
    async delete(email){
        await UserModel.findOneAndDelete({email})
    }

    //logs a user in
    async isUser(email, password){
        await UserModel.findOne({email})
    }
}

module.exports = User