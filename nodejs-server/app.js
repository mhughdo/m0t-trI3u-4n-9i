require('dotenv').config()
require('./db/mongoose')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const indexRouter = require('./routes/index')
const signInRouter = require('./routes/sign-in')

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRouter)
app.use('/signin', signInRouter)

module.exports = app
