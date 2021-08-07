import {UserVideoDashboardActionTypes} from './userVideoDashboard.action.types';

const inital_state={
    userVideos:[]
}


const UserVideoDashboardReducer=(state=inital_state,action)=>{
    switch(action.type){    
        case UserVideoDashboardActionTypes.userFetchVideosSuccess:
            return{
                ...state,
                userVideos:action.payload
            }
        case UserVideoDashboardActionTypes.userDeleteVideoSuccess:
            const result=state.userVideos.filter(video=>video._id!==action.payload.video_id)
            return{
                ...state,
                userVideos:result
            }
        default:
            return{
                ...state
            }
    }
}

export default UserVideoDashboardReducer;