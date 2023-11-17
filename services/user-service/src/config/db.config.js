const mongoose = require('mongoose')
const logger = require('./winston.config')

mongoose.connect(process.env.USER_SERVICE_DB_URI)

mongoose.connection.once('open', ()=>{
    logger.info(`Database server connected successfully`)
    console.log(`Database server connected successfully`);
}).on('error', (error)=>{
    logger.error(error.message, error)
    console.log(`Error connecting to database server: ${error.message}`);
})