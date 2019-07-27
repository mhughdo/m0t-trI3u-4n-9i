const axios = require('axios')

const makeRequest = instance => async args => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }
    args.headers = Object.assign({}, defaultHeaders, args.headers)
    const {data} = await instance(args)
    return data
}
const instance = axios.create({
    timeout: 30000,
})
module.exports = {
    makeRequest: makeRequest(instance),
}
