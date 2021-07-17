import {VideoDashboardActionTypes} from './videoDashboard.types';

export const fetchVideosStart=(token)=>({
    type:VideoDashboardActionTypes.fetchVideosStart,
    payload:token
})

export const fetchVideosFailure = (error)=>({
    type:VideoDashboardActionTypes.fetchVideosFailure,
    payload:error
})

export const fetchVideosSuccess = (response)=>({
    type:VideoDashboardActionTypes.fetchVideosSuccess,
    payload:response
})
