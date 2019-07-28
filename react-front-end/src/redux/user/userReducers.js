import {UserActionTypes} from './userTypes'

const INITIAL_STATE = {
    currentUser: null,
    loading: true,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            }
        default:
            return state
    }
}

export default userReducer
