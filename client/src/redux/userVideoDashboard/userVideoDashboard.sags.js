import {put, call, all, takeEvery} from 'redux-saga/effects';
import { UserVideoDashboardActionTypes } from './userVideoDashboard.action.types'; 
import { deleteVideoSuccess, fetchVideosSuccess } from './userVideoDashboard.actions';
import {setVideoDashboardPageAlert} from '../Alerts/Alert.Actions';
import axios from 'axios'

function* fetchUserVideosHandler({payload}){
    try{
        const token="bearer "+payload.token;
        const headers={'authorization':token}
        const response=yield axios({
            method: 'post',
            url: '/user/videos/get_my_videos',
            data:{currentUser_id:payload.currentUser_id},
            headers:headers
        })
        if(response.data.videos==null)
        {
            yield put(setVideoDashboardPageAlert({state:true,message:'Null returned from video server'}));
        }else{
            yield put(fetchVideosSuccess(response.data.videos))
        }
    }catch(error){
        console.log(error);
        yield put(setVideoDashboardPageAlert({state:true,message:error.response.data.message}));
    }
}

function* deleteUserVideoHandler({payload}){
    try{
        const token="bearer "+payload.token;
        const headers={'authorization':token}
        yield axios({
            method: 'delete',
            url: '/user/videos/'+payload.video_id,
            data:{title:payload.video_path},
            headers:headers
        })
        yield put(deleteVideoSuccess(payload.video_id));
    }catch(error){
        console.log(error);
        yield put(setVideoDashboardPageAlert({state:true,message:error.response.data.message}));
    }
}

function* fetchUserVideosStart(){
    yield takeEvery(UserVideoDashboardActionTypes.userFetchVideosStart,fetchUserVideosHandler)
}

function* deleteUserVideoStart(){
    yield takeEvery(UserVideoDashboardActionTypes.userDeleteVideoStart,deleteUserVideoHandler);
}

export function* rootUserVideosSaga(){
    yield all([call(fetchUserVideosStart),call(deleteUserVideoStart)]);
}