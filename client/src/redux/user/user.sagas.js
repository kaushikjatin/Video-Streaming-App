import {takeEvery,all,call,put} from 'redux-saga/effects';
import { UserActionTypes } from './user.actions.types';
import {signInSuccess,signUpSuccess} from './user.actions';
import { setSignInPageAlert ,setSignUpPageAlert} from '../Alerts/Alert.Actions';
import axios from 'axios';


function* emailSignInHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signin',
            data: {email:payload.email,password:payload.password}
        })
        yield put(signInSuccess(response.data));
        yield put(setSignInPageAlert({state:true,message:'Signed In Successfully!'}))
        payload.history.push('/');
    }catch(error){
        yield put(setSignInPageAlert({state:true,message:error.response.data.message}));
    }
}

function* emailSignUpHandler({payload}){
    try{
        const response=yield axios({
            method: 'post',
            url: '/user/auth/signup',
            data: payload
        })
        yield put(signUpSuccess(response.data));
        payload.history.push('/');
    }catch(error){
        yield put(setSignUpPageAlert({state:true,message:error.response.data.message}));
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