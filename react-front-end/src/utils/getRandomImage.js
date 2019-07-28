import createAPI from './createAPI'

export const getRandomImg = async () => {
    const api = createAPI('https://randomuser.me/api/')
    const data = await api.makeRequest({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data
}

