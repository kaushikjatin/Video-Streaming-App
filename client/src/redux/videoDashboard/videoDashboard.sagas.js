import {put, call, all, takeEvery} from 'redux-saga/effects';
import {VideoDashboardActionTypes} from './videoDashboard.types';
import {fetchVideosSuccess,fetchVideosFailure} from './videoDashboard.actions';
import axios from 'axios'

function* fetchVideosHandler({payload}){
    try{
        const response=yield axios({
            method: 'get',
            url: '/user/videos/videos_list',
        })
        if(response.data.videos==null)
        {
            yield put(fetchVideosFailure(response.data.error))
        }else{
            yield put(fetchVideosSuccess(response.data.videos))
        }
    }catch(error){
        console.log(error);
        yield put(fetchVideosFailure(error));
    }
}

function* fetchVideosStart(){
    yield takeEvery(VideoDashboardActionTypes.fetchVideosStart,fetchVideosHandler)
}

export function* rootVideosSaga(){
    yield all([call(fetchVideosStart)]);
}