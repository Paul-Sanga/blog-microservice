const amqplib = require('amqplib')

const User = require('../model/user.model')

module.exports.consumer = async()=>{
    try {
        
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()

        await channel.assertQueue('registeredUsers', {durable: true})
        channel.consume('registeredUsers', async(msg)=>{
            try {
                const data = JSON.parse(msg.content.toString())
                const author = new User(data)
                await author.save()
                channel.ack(msg)
            } catch (error) {
                throw error
            }
        })

    } catch (error) {
        throw e;
    }
}

module.exports.updateConsumer = async()=>{
    try {
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()

        await channel.assertQueue('updateUserQueue', {durable: true})
        channel.consume('updateUserQueue', async(message)=>{
            try {
                const { _id, firstName, lastName, email } = JSON.parse(message.content.toString())
                const user = await User.findById(_id)
                if(!user) throw new Error('Error: Invalid user id')
                const updatedUser = await User.findByIdAndUpdate(_id, {firstName, lastName, email})
                await updatedUser.save()
                channel.ack(message)
            } catch (error) {
                console.log(error.message);
                throw error
            }
        })
    } catch (error) {
        throw error
    }
}

module.exports.deleteConsumer = async()=>{
    try {
        
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()

        await channel.assertQueue('deleteUserQueue', {durable: true})
        channel.consume('deleteUserQueue', async(message)=>{
            const {id} = JSON.parse(message.content.toString())
            const user = await User.findById(id)
            if(!user) throw new Error('Error: Invalid user id')
            User.deleteOne({_id: id})
            .then(()=>{})
            .catch((e)=>{
                console.log(error.message);
                throw e;
            })
            channel.ack(message)
        })

    } catch (error) {
        throw error
    }
}