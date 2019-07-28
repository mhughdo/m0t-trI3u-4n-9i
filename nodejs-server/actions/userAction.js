const createAPI = require('../utils/createAPI')
const User = require('../models/userProfile')

const _fields = ['age', 'height', 'job', 'longtitude', 'latitude', 'sports', 'sex', 'name']

exports.createProfile = async args => {
    const missingFields = _fields.filter(field => !Object.keys(args).includes(field))
    if (missingFields.length) {
        throw new Error(`${missingFields.join(', ')} are required`)
    }
    const {age, height, job, longtitude, latitude, sports, sex, name} = args
    const userCount = await User.findOne({}).countDocuments()
    const data = {
        index: `${userCount}`,
        age,
        height,
        job,
        longtitude,
        latitude,
        sports,
        sex,
        name,
    }
    const user = new User(data)
    const api = createAPI('https://hughdo.dev/api/v2')
    const res = await api.makeRequest({
        method: 'POST',
        data,
        url: '/add',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(res)
    await user.save()

    return user
}

exports.getUser = async id => {
    if (!id) throw new Error('id is required')
    const user = await User.findOne({index: id})
    console.log(user)
    if (!user) throw new Error(`User with id ${id} not found`)
    return user
}

exports.getMatches = async id => {
    if (!id) throw new Error('id not found')
    const _fields2 = ['Age', 'Height', 'Job', 'Longtitude', 'Latitude', 'Sports', 'Sex', 'Name']
    const user = await User.findOne({index: id}).lean()
    if (!user) throw new Error('User not found')

    const {
        index,
        age: Age,
        height: Height,
        job: Job,
        longtitude: Longtitude,
        latitude: Latitude,
        sports: Sports,
        sex: Sex,
        name: Name,
    } = user
    const data = {
        index,
        Age,
        Height,
        Job,
        Longtitude,
        Latitude,
        Sports,
        Sex,
        Name,
    }
    const api = createAPI('https://hughdo.dev/api/v2')
    const res = await api.makeRequest({
        method: 'POST',
        data,
        url: '/user',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(res)
    if (res && res.length) return res
    throw new Error('No matches found')
}
