const mongoose = require('mongoose')

const logger = require('./winston.config')

mongoose.connect(process.env.BLOGS_DB_URI)

mongoose.connection.once('open', ()=>{
    logger.info('Database server conneted successfully')
    console.log('Database server conneted successfully');
}).on('error', (error)=>{
    logger.error(error.message, error)
    console.log(`Error connecting to database server: ${error.message}`);
})