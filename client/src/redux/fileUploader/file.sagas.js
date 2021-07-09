import { FileActionTypes } from "./file.types";
import { takeEvery,put,all,call } from "redux-saga/effects";
import axios from "axios";

function* FileUploadHandler({payload}){
    try{
        var formData=new FormData();
        formData.append('userFile',payload.selectedFile);
        const headers={'authorization':payload.token}
        const response=yield axios({
            method: 'post',
            url: '/user/videos/upload_video',
            data: formData,
            headers:headers
        })
        console.log(response)
    }catch(error){
        console.log(error);
    }
}

function* FileUploadStart(){
    yield takeEvery(FileActionTypes.FileUploadStart,FileUploadHandler);
}

export function* rootFileSaga(){
    yield all([call(FileUploadStart)]);
}