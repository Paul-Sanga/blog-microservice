const winston = require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
  level:'verbose',
  format: winston.format.json(),
  defaultMeta: {service: 'user_service'},
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
    new winston.transports.File({filename: 'errors.log', level: 'error'}),
    new winston.transports.MongoDB({
        db: process.env.USER_SERVICE_DB_LOGS_URI,
        options: {
            useUnifiedTopology: true
        }
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({filename: 'rejections.log'}),
    new winston.transports.MongoDB({
        db: process.env.USER_SERVICE_REJECTIONS_URI,
        options: {
            useUnifiedTopology: true
        }
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({filename: 'exceptions.log'}),
    new winston.transports.MongoDB({
        db: process.env.USER_SERVICE_EXCEPRIONS_URI,
        options: {
            useUnifiedTopology: true
        }
    })
  ]  
})

module.exports = logger