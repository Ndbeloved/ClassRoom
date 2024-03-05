const jwt = require('jsonwebtoken')


class Jwt{
    sign(user){
        try{
            delete user.password
            delete user.salt
            const {email, password, isCourseRep, balance, department} = user
            const payload = {
                email,
                password,
                isCourseRep,
                balance,
                department,
            }
            const secret = process.env.SECRET_KEY_JWT
            const option = {
                expiresIn: '24hr',
            }
            const token = jwt.sign(payload, secret, option)
            return token
        }catch(err){
            return false
        }
    }

    verify(token){
        try{
            const decodedJWT = jwt.decode(token, process.env.SECRET_KEY_JWT)
            return decodedJWT
        }
        catch(err){
            return false
        }
    }
}

module.exports = Jwt