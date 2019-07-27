const User = require('../models/userProfile')

const _fields = ['age', 'height', 'job', 'longtitude', 'latitude', 'sports', 'sex', 'name']

exports.createProfile = async args => {
    const missingFields = _fields.filter(field => !Object.keys(args).includes(field))
    if (missingFields.length) {
        throw new Error(`${missingFields.join(', ')} are required`)
    }
    const {Age, Height, Job, Longtitude, Latitude, Sports, Sex, Name} = args
    const lastUser = await User.findOne({})
        .sort({index: -1})
        .limit(1)
        .lean()
    const {index: lastIndex} = lastUser
    const user = new User({index: lastIndex + 1, Age, Height, Job, Longtitude, Latitude, Sports, Sex, Name})
    await user.save()
    return user
}
