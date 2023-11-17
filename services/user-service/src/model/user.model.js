const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        required: [true, "First name field is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name field is required"]
    },
    email: {
        type: String,
        unique: [true, 'Email field should be unique'],
        required: [true, "Email name field is required"]
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)

module.exports = User