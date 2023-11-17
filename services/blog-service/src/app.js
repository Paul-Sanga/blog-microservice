const cors = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.port
require('./config/db.config')
const routes = require('./routes/routes')
const logger = require('./config/winston.config')
const { errorLogger } = require('./middleware/errorLogger')
const { consumer, updateConsumer, deleteConsumer } = require('./utils/user.consumer')

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/blogs', routes)
app.use(errorLogger)

setInterval(()=>{
    consumer()
    updateConsumer()
    deleteConsumer()
}, 1000)


const server = app.listen(port, ()=>{
    logger.info(`Blogs service running on: http://127.0.0.1:${port}`)
    console.log(`Blogs service running on: http://127.0.0.1:${port}`);
})

module.exports = server