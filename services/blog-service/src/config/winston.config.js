const winston = require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
    level: 'verbose',
    format: winston.format.json(),
    defaultMeta: {service: 'Blog service'},
    transports: [
        new winston.transports.File({ filename: 'combined.log'}),
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.MongoDB({
            db: process.env.BLOGS_DB_LOGS, 
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        })        
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exceptions.log'}),
        new winston.transports.MongoDB({
            db: process.env.BLOGS_EXCEPTIONS_LOGS,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'rejections.log' }),
        new winston.transports.MongoDB({
            db: process.env.BLOGS_REJECTIONS_LOGS,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        })
    ]
})

module.exports = logger