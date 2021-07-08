import { UserActionTypes } from "./user.actions.types";

export const emailSignInStart=({email,password})=>({
    type:UserActionTypes.EmailSignInStart,
    payload:{email,password}
})

export const signInFailure = (error)=>({
    type:UserActionTypes.SignInFailure,
    payload:error
})

export const signInSuccess = (user)=>({
    type:UserActionTypes.SignInSuccess,
    payload:user
})

export const emailSignUpStart=({email,password,firstName,lastName})=>({
    type:UserActionTypes.EmailSignUpStart,
    payload:{email,password,firstName,lastName}
})

export const signUpFailure = (error)=>({
    type:UserActionTypes.SignUpFailure,
    payload:error
})

export const signUpSuccess = (user)=>({
    type:UserActionTypes.SignUpSuccess,
    payload:user
})