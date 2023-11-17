const cors = require('cors')
const morgan = require('morgan')
const helment = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT
require('./config/db.config')
const routes = require('./routes/routes')
const logger = require('./config/winston.config')
const {errorLogger} = require('./middleware/errorLogger')

app.use(cors())
app.use(helment())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/user', routes)
app.use(errorLogger)

const server = app.listen(port, ()=>{
    logger.info(`User service runining on: http://127.0.0.1:${port}`)
    console.log(`User service runining on: http://127.0.0.1:${port}`)
})

module.exports = server