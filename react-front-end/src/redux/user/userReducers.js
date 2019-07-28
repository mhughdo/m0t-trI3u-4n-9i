import {UserActionTypes} from './userTypes'

const INITIAL_STATE = {
    currentUser: null,
    loading: true,
}

const userReducer = (state = INITIAL_STATE, action) => {
    // console.log('payload', action.payload)
    console.log('state', state)
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                loading: false,
                currentUser:
                    action.payload && action.payload.hasOwnProperty('currentUser') ? action.payload.currentUser : null,
            }
        default:
            return state
    }
}

export default userReducer
