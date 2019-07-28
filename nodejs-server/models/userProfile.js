const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    index: {
        type: String,
        required: [true, 'Index is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    sex: {
        type: String,
        required: [true, 'Sex is required'],
    },
    sports: {type: String, required: [true, 'Sports is required']},
    longtitude: {
        type: Number,
        required: [true, 'Location is required'],
    },
    latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
    },
    job: {
        type: String,
        required: [true, 'Job is required'],
    },
    height: {
        type: String,
        required: [true, 'Height is required'],
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
