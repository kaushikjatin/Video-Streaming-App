import {UserActionTypes} from './user.actions.types'

const initial_state={
    currentUser:null,
    token:null,
    time:null
}

const userReducer =(state=initial_state,action)=>{
    switch(action.type){
        case UserActionTypes.SignInSuccess:
            return{
                ...state,
                currentUser:action.payload.firstName,
                token:action.payload.token,
                time:new Date()
            }
        case UserActionTypes.SignInFailure:
            return{
                ...state,
                error:action.payload
            }
        case UserActionTypes.SignUpSuccess:
            return{
                ...state,
                currentUser:action.payload
            }
        case UserActionTypes.SignUpFailure:
            return{
                ...state,
                error:action.payload
            }
        case UserActionTypes.SignOut:
            return{
                ...state,
                currentUser:null,
                token:null,
                time:null
            }
        default:
            return state;
    }
}

export default userReducer;
