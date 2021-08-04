import { UserActionTypes } from "./user.actions.types";

export const emailSignInStart=({email,password,history})=>({
    type:UserActionTypes.EmailSignInStart,
    payload:{email,password,history,}
})

export const signInSuccess = (response)=>({
    type:UserActionTypes.SignInSuccess,
    payload:response
})

export const emailSignUpStart=({email,password,firstName,lastName,history})=>({
    type:UserActionTypes.EmailSignUpStart,
    payload:{email,password,firstName,lastName,history}
})


export const signUpSuccess = (user)=>({
    type:UserActionTypes.SignUpSuccess,
    payload:user
})

export const signOut=()=>({
    type:UserActionTypes.SignOut
})