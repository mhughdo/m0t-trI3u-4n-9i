const createAPI = require('./createAPI')

const fakeImageURL = async () => {
    const api = createAPI()
    const res = await api.makeRequest({
        method: 'GET',
        url: 'https://randomuser.me/api/',
    })
    const {results} = res
    const {
        picture: {large},
    } = results[0]
    return large
}

module.exports = fakeImageURL
