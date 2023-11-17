const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const { producer, updateProducer, deleteProducer } = require('../utils/user.producer')
const { userRegistrationSchema, userLoginSchema, updateUserSchema } = require('../utils/validators')

module.exports.register = async(req, res)=>{

    try {
        
        if(!req.body) return res.status(422).json({error: `Request body is required`})

        const { firstName, lastName, email, password } = req.body
        const {error} = userRegistrationSchema.validate({ firstName, lastName, email, password })
        if(error) return res.status(422).json({error: error.message})

        const registeredUser = await User.findOne({email})
        if(!registeredUser){
            const user = new User({
                firstName,
                lastName,
                email,
                password
            })
            await user.save()
            producer(JSON.stringify({_id: user._id, firstName, lastName, email}))
            return res.status(201).json({message: 'user created!'}) 
        }
        return res.status(409).json({error: 'Email already registered'})

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }

}

module.exports.login = async(req, res)=>{

    try {

        if(!req.body) return res.status(422).json({error: 'Request body is required'})
        
        const { email, password } = req.body
        const {error} = userLoginSchema.validate({email, password})
        if(error) return res.status(422).json({error: error.message})

        const user = await User.findOne({email})
        if(!user) return res.status(409).json({error: 'Invalid login credentials'})

        const valid = bcrypt.compare(password, user.password)
        if(!valid) return res.status(409).json({error: 'Invalid login credentials'})

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: 24 * 60 * 60
            }
        )

        return res.status(200).json({message: 'Login successful', token})


    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }

}

module.exports.getAllUsers = async(req, res)=>{
    try {
        
        const users = await User.find()
        return res.status(200).json({message: 'Fetch successful', users})

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}

module.exports.updateUser = async(req, res)=>{
    try {
        const {id} = req.params
        const {firstName, lastName, email} = req.body
        const { error } = updateUserSchema.validate({firstName, lastName, email})
        if(error) return res.status(422).json({error: error.message})

        const user = await User.findById(id)
        if(!user) return res.status(404).json({error: 'Invalid user id'})

        const updatedUser = await User.findByIdAndUpdate(id, {firstName, lastName, email})
        await updatedUser.save()
        updateProducer(JSON.stringify({
            _id: user._id,
            firstName,
            lastName,
            email
        }))
        return res.status(200).json({message: 'Update successful'})
    } catch (error) {
        throw error
    }
}

module.exports.deleteUser = async(req, res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).json({error: 'Invalid user id'})

        User.deleteOne({_id: id})
        .then((deletedUser)=>{
            deleteProducer(JSON.stringify({id}))
            return res.status(200).json({message: 'User account deleted!'})
        })
        .catch((e)=>{
            return res.status(500).json({error: e.message})
        })

    } catch (error) {
        throw error
    }
}