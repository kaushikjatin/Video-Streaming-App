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