import {VideoDashboardActionTypes} from './videoDashboard.types';

export const fetchVideosStart=(token)=>({
    type:VideoDashboardActionTypes.fetchVideosStart,
    payload:token
})

export const fetchVideosSuccess = (response)=>({
    type:VideoDashboardActionTypes.fetchVideosSuccess,
    payload:response
})
