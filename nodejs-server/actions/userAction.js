const createAPI = require('../utils/createAPI')
const User = require('../models/userProfile')
const UserBio = require('../models/userBio')
const fakeImageURL = require('../utils/fakeImageURL')

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
    const imageURL = await fakeImageURL()
    const user = new User(data)
    const userBio = new UserBio({name, sex, imageURL, index: `${userCount}`})
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
    await userBio.save()
    return {...JSON.parse(JSON.stringify(user)), imageURL}
}

exports.getUser = async id => {
    if (!id) throw new Error('id is required')
    const user = await User.findOne({index: id})
    const userBio = await UserBio.findOne({index: id})
    console.log(user)
    if (!user) throw new Error(`User with id ${id} not found`)
    return Object.assign({}, user, userBio)
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
    console.log(data)
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

    if (res && res.length) {
        for (let i = 0; i < res.length; i++) {
            const {
                profile: {index},
            } = res[i]
            const userBio = await UserBio.findOne({index})
            const {imageURL} = userBio
            res[i] = {...res[i], imageURL}
        }
        return res
    }
    throw new Error('No matches found')
}
