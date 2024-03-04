const mongoose = require('mongoose')
const UserModel = require('./../models/UserModel')

class User{
    constructor(){
        //
    }

    //create new user
    async createNew(email, username, password){
        UserModel.create({
            email,
            username,
            password,
        })
    }

    //drop a user from the database
    delete(email){
        UserModel.findOneAndDelete({email})
    }
}

module.exports = User