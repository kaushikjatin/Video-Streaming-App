import {UserActionTypes} from './user.actions.types'

const initial_state={
    currentUser:null,
    token:null,
    time:null,
    currentUser_id:null
}

const userReducer =(state=initial_state,action)=>{
    switch(action.type){
        case UserActionTypes.SignInSuccess:
            return{
                ...state,
                currentUser:action.payload.firstName,
                token:action.payload.token,
                time:new Date(),
                currentUser_id:action.payload.user_id
            }
        case UserActionTypes.SignUpSuccess:
            return{
                ...state,
                currentUser:action.payload.firstName,
                token:action.payload.token,
                time:new Date(),
                currentUser_id:action.payload.user_id
            }
        case UserActionTypes.SignOut:
            return{
                ...state,
                currentUser:null,
                token:null,
                time:null,
                currentUser_id:null,
            }
        default:
            return state;
    }
}

export default userReducer;
