import { VideoDashboardActionTypes } from "./videoDashboard.types";
const inital_state={
    videos:[]
}

const VideoDashboardReducer=(state=inital_state,action)=>{
    switch(action.type){
        case VideoDashboardActionTypes.fetchVideosSuccess:
            return{
                ...state,
                videos:action.payload
            }
        case VideoDashboardActionTypes.fetchVideosFailure:
            return{
                ...state,
                error:action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default VideoDashboardReducer;