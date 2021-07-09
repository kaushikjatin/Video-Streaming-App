import {takeEvery,all,call,put} from 'redux-saga/effects';
import { UserActionTypes } from './user.actions.types';
import {signInSuccess,signInFailure} from './user.actions'
import axios from 'axios';


function* emailSignInHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signin',
            data: payload
        })
        yield put(signInSuccess(response.data));
    }catch(error){
        console.log(error);
    }
}

function* emailSignUpHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signup',
            data: payload
        })
        console.log(response)
    }catch(error){
        console.log(error);
    }
}

 function* EmailSignInStart(){
   yield takeEvery(UserActionTypes.EmailSignInStart,emailSignInHandler);
}

function* EmailSignUpStart(){
    yield takeEvery(UserActionTypes.EmailSignUpStart,emailSignUpHandler);
}

export function* rootUserSaga(){
    yield all([call(EmailSignInStart),call(EmailSignUpStart)]);
}