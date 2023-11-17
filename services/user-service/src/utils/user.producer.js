const amqplib = require('amqplib')

module.exports.producer = async(message)=>{
    try {
        
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()
        await channel.assertQueue('registeredUsers', {durable: true})
        channel.sendToQueue('registeredUsers', Buffer.from(message), {persistent: true})
        setTimeout(async()=>{
            await channel.close()
        }, 500)

    } catch (error) {
        throw error;
    }
} 

module.exports.updateProducer = async(message)=>{
    try {
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()
        await channel.assertQueue('updateUserQueue', {durable: true})
        channel.sendToQueue('updateUserQueue', Buffer.from(message), {persistent: true})
        setTimeout(async()=>{
            await channel.close()
        }, 500)
    } catch (error) {
        throw error
    }
}

module.exports.deleteProducer = async(message)=>{
    try {
        const connection = await amqplib.connect(process.env.AMQP_URI)
        const channel = await connection.createChannel()
        await channel.assertQueue('deleteUserQueue', {durable: true})
        channel.sendToQueue('deleteUserQueue', Buffer.from(message), {persistent: true})
        setTimeout(async()=>{
            await channel.close()
        })
    } catch (error) {
        throw error
    }
}