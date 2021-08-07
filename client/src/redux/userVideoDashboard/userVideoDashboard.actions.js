import {UserVideoDashboardActionTypes} from './userVideoDashboard.action.types';

export const fetchVideosStart=(currentUser_id,token)=>({
    type:UserVideoDashboardActionTypes.userFetchVideosStart,
    payload:{currentUser_id,token}
})

export const fetchVideosSuccess = (response)=>({
    type:UserVideoDashboardActionTypes.userFetchVideosSuccess,
    payload:response
})

export const deleteVideoStart=(video_id,video_path,token)=>({
    type:UserVideoDashboardActionTypes.userDeleteVideoStart,
    payload:{video_id,video_path,token}
})

export const deleteVideoSuccess = (video_id)=>({
    type:UserVideoDashboardActionTypes.userDeleteVideoSuccess,
    payload:{video_id}
})
