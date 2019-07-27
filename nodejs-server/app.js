require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')
// const hpp = require('hpp')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)
app.use(express.json({limit: '1000kb'}))
app.use(mongoSanitize())
app.use(xss())

app.use('/', indexRouter)
app.use('/users/', userRouter)

module.exports = app
