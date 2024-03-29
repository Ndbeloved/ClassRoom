const crypto = require('crypto')

class Password{
    constructor(){
        //
    }

    async hash(password){
        const salt = crypto.randomBytes(16).toString('hex')
        const hash = crypto.createHash('sha256').update(salt + password).digest('hex')
        return {hash, salt}
    }

    async decrypt(salt, password, original){
        const hash = crypto.createHash('sha256').update(salt + password).digest('hex')
        if(hash != original) return false
        return true
    }
}

module.exports = Password