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
        const headers={'authorization':payload.token}
        makeAxiosRequest(formData,headers,onUploadProgress);
        while (true) {
            const data = yield take(channel);
            console.log(data);
            yield put(SetFileUploadBar(data));
        }
        // yield put(FileUploadSuccess());
        // uploadPromise.then(response=>console.log(response)).catch(error=>console.log("ERROR____>",error));
    }catch(error){
        console.log(error);
    }finally {
        yield put(SetFileUploadBar(100));
        yield put(FileUploadSuccess());
        // console.log(uploadPromise.then(response=>{console.log(response)}));
      }
}



function* FileUploadStart(){
    yield takeEvery(FileActionTypes.FileUploadStart,FileUploadHandler);
}

export function* rootFileSaga(){
    yield all([call(FileUploadStart)]);
}
