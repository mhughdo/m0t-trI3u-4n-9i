const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: [true, 'Index is required'],
        unique: true,
    },
    Name: {
        type: String,
        required: [true, 'Name is required'],
    },
    Sex: {
        type: String,
        required: [true, 'Sex is required'],
    },
    Sports: {type: String, required: [true, 'Sports is required']},
    Longtitude: {
        type: Number,
        required: [true, 'Location is required'],
    },
    Latitude: {
        type: Number,
        required: [true, 'Latitude is required'],
    },
    Job: {
        type: String,
        required: [true, 'Job is required'],
    },
    Height: {
        type: String,
        required: [true, 'Height is required'],
    },
    Age: {
        type: String,
        required: [true, 'Age is required'],
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
