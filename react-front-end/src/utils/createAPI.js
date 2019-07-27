const axios = require('axios')

const makeRequest = instance => async args => {
    const defaultHeaders = {
        // 'Content-Type': 'application/json',
    }
    args.headers = Object.assign({}, defaultHeaders, args.headers)
    const {data} = await instance(args)
    return data
}

export default (baseURL = '') => {
    const instance = axios.create({
        baseURL,
        timeout: 30000,
    })
    return {makeRequest: makeRequest(instance)}
}
