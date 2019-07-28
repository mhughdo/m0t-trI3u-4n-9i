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
                currentUser: action && action.payload && action.payload.currentUser || action.payload,
            }
        default:
            return state
    }
}

export default userReducer
