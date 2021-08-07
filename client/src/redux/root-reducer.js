import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import VideoDashboardReducer from './videoDashboard/videoDashboard.reducer'
import FileReducer from './fileUploader/file.reducer'
import AlertReducer from './Alerts/Alert.reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import UserVideoDashboardReducer from './userVideoDashboard/userVideoDashboard.reducer'


const persistConfig={
    key:'root',
    storage,
    whitelist:['user']
}



const rootReducer= combineReducers({
    user:userReducer,
    video:VideoDashboardReducer,
    uploaded_file:FileReducer,
    alert:AlertReducer,
    userVideo:UserVideoDashboardReducer
})

const PersistReducer=persistReducer(persistConfig,rootReducer);
export default PersistReducer;