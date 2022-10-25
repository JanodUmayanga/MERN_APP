const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SChema = mongoose.Schema

const userSchema = new SChema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(username, password) {

    if(!username || !password) {
        throw Error('Fill all fields')
    }

    const exists = await this.findOne({ username })

    if(exists) {
        throw Error('Username already exists!')
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //storing details in db
    const user = await this.create({username, password: hash})

    return user

}

//static login method
userSchema.statics.login = async function(username, password) {
    if(!username || !password) {
        throw Error('Fill all fields')
    }

    const user = await this.findOne({ username })

    if(!user) {
        throw Error('Incorrect Username!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect Password!')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)