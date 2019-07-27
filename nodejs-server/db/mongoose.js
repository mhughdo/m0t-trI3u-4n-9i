const mongoose = require('mongoose')
require('dotenv').config()

const {MONGO_URL} = process.env

const databaseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

mongoose.Promise = global.Promise
mongoose
    .connect(MONGO_URL, databaseOptions)
    .then(() => console.log('Connected to the database'))
    .catch(err => {
        console.log(`Could not connect to the database: ${err.message}`)
        process.exit()
    })
