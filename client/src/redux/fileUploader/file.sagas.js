import { FileActionTypes } from "./file.types";
import {SetFileUploadBar,FileUploadSuccess} from './file.actions'
import { takeEvery,put,all,call ,take} from "redux-saga/effects";
import axios from "axios";
import { eventChannel, END } from 'redux-saga'


let emit;

const onUploadProgress=(progressEvent)=>{
    let completed=Math.round((progressEvent.loaded * 100) / progressEvent.total);
    if(completed===100)
        emit(END);
    else 
        emit(completed);
}

function makeAxiosRequest(data,headers,onUploadProgress){
    return axios({
        method:'post',
        url:'/user/videos/upload_video',
        data:data,
        headers:headers,
        onUploadProgress:onUploadProgress
    }).then(Response=>Response)
    .catch(error=>error);
}


function* FileUploadHandler({payload}){
    try{
        const channel=eventChannel(emitter =>{
            emit=emitter;
            return ()=>{};
        })
        var formData=new FormData();
        formData.append('userFile',payload.selectedFile);
        formData.append('video_name',payload.videoName);
        const headers={'authorization':payload.token}
        makeAxiosRequest(formData,headers,onUploadProgress);
        while (true) {
            const data = yield take(channel);
            yield put(SetFileUploadBar(data));
        }
    }catch(error){
        console.log(error);
    }finally {
        yield put(SetFileUploadBar(100));
        yield put(FileUploadSuccess());
      }
}



function* FileUploadStart(){
    yield takeEvery(FileActionTypes.FileUploadStart,FileUploadHandler);
}

export function* rootFileSaga(){
    yield all([call(FileUploadStart)]);
}
