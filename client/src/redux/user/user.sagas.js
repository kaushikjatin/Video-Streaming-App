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
        console.log(response)
    }catch(error){
        console.log(error);
    }
}

 function* EmailSignInStart(){
   yield takeEvery(UserActionTypes.EmailSignInStart,emailSignInHandler);
}

export function* rootUserSaga(){
    yield all([call(EmailSignInStart)]);
}