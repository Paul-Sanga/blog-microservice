const logger = require('../config/winston.config')

module.exports.errorLogger = (err, req, res, next)=>{
    if(err){
        logger.error(err.message, err)
        console.log(`Internal server error: ${err.message}`);
        return res.status(500).json({error: `Internal server error`})
    }
    return next()
}