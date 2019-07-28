const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')

const userBioSchema = new mongoose.Schema({
    index: {
        type: String,
        required: [true, 'Index is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    imageURL: {
        type: String,
        required: [true, 'imageURL is required'],
    },
    sex: {
        type: String,
        required: [true, 'sex is required'],
    },
})

const UserBio = mongoose.model('UserBio', userBioSchema)

module.exports = UserBio
