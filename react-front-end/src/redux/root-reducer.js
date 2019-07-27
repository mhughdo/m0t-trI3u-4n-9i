import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userReducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const rootReducer = combineReducers({
    user: userReducer,
})

export default persistReducer(persistConfig, rootReducer)
