import {put, call, all, takeEvery} from 'redux-saga/effects';
import {VideoDashboardActionTypes} from './videoDashboard.types';
import {fetchVideosSuccess} from './videoDashboard.actions';
import {setVideoDashboardPageAlert} from '../Alerts/Alert.Actions';
import axios from 'axios'

function* fetchVideosHandler({payload}){
    try{
        const response=yield axios({
            method: 'get',
            url: '/user/videos/videos_list',
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

function* fetchVideosStart(){
    yield takeEvery(VideoDashboardActionTypes.fetchVideosStart,fetchVideosHandler)
}

export function* rootVideosSaga(){
    yield all([call(fetchVideosStart)]);
}