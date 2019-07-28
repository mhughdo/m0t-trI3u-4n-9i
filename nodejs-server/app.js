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
const User = require('./models/userProfile')
const UserBio = require('./models/userBio')
const createAPI = require('./utils/createAPI')

const app = express()

async function runnn() {
    const datas = await User.find({})

    for (let i = 0; i < datas.length; i++) {
        const api = createAPI()
        const res = await api.makeRequest({
            method: 'GET',
            url: 'https://randomuser.me/api/',
        })
        const {results} = res
        const {
            picture: {large},
        } = results[0]
        const userbio = new UserBio({index: i, name: datas[i].name, sex: datas[i].sex, imageURL: large})
        console.log(i)
        await userbio.save()
    }
}

// runnn()

async function runn() {
    const {GEO_KEY} = process.env
    const data = await User.find({}).limit(20)
    const api = createAPI()
    for (const item of data) {
        const {Longtitude, Latitude} = item
        const long = parseFloat(Longtitude) / 1000000 + 105
        const la = parseFloat(Latitude) / 1000000 + 20
        // console.log(`${long} ${la}`)
        const geo = await api.makeRequest({
            method: 'GET',
            url: `https://api.opencagedata.com/geocode/v1/json?key=${GEO_KEY}&q=${la}+${long}&pretty=1`,
        })
        const {results} = geo
        const {
            components: {county, city, state},
        } = results[0]
        console.log(`${county} ${city || state}`)
    }
}

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
// app.use(mongoSanitize())
// app.use(xss())

app.use('/', indexRouter)
app.use('/users/', userRouter)

module.exports = app
