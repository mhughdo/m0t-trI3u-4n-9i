import createAPI from './createAPI'

export const getMatchedUser = async id => {
    const api = createAPI('https://hughdo.dev/api/v1')
    const data = await api.makeRequest({
        method: 'GET',
        url: `/users/matches/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data
}
