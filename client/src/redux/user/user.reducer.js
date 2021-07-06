import {UserActionTypes} from './user.actions.types'

const initial_state={
    currentUser:null
}

const userReducer =(state=initial_state,action)=>{
    switch(action.type){
        case UserActionTypes.SignInSuccess:
            return{
                ...state,
                currentUser:action.payload
            }
        case UserActionTypes.SignInFailure:
            return{
                ...state,
                currentUser:null,
                error:action.payload
            }
        
        default:
            return{
                ...state
            }
    }
}

export default userReducer;
