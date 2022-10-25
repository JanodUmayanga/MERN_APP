const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.login(username, password)

        //create a token
        const token = createToken(user._id)

        res.Status(200).json({username, token})
    } catch(error) {
        res.Status(400).json({error: error})

    }

    res.json({mssg: 'losin user'})
}

//signup
const signupUser = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await User.signup(username, password)

        //create a token
        const token = createToken(user._id)

        res.Status(200).json({username, token})
    } catch(error) {
        res.Status(400).json({error: error})

    }
}

module.exports = {signupUser, loginUser}