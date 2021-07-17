import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import VideoDashboardReducer from './videoDashboard/videoDashboard.reducer'

const rootReducer= combineReducers({
    user:userReducer,
    video:VideoDashboardReducer
})

export default rootReducer;