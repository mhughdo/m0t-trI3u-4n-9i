const User = require('../models/userProfile')

const _fields = ['age', 'height', 'job', 'longtitude', 'latitude', 'sports', 'sex', 'name']

exports.createProfile = async args => {
    const missingFields = _fields.filter(field => !Object.keys(args).includes(field))
    if (missingFields.length) {
        throw new Error(`${missingFields.join(', ')} are required`)
    }
    const {age, height, job, longtitude, latitude, sports, sex, name} = args
    const lastUser = await User.findOne({})
        .sort({index: -1})
        .limit(1)
        .lean()
    const {index: lastIndex} = lastUser
    const user = new User({index: parseInt(lastIndex) + 1, age, height, job, longtitude, latitude, sports, sex, name})
    await user.save()
    return user
}
