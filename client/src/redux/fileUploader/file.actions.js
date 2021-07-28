import {FileActionTypes} from './file.types';

export const FileUploadStart=(payload)=>({
    type:FileActionTypes.FileUploadStart,
    payload:payload
})

export const FileUploadSuccess=()=>({
    type:FileActionTypes.FileUploadSuccess
})

export const FileUploadFailure=(error)=>({
    type:FileActionTypes.FileUploadFailure,
    payload:error
})

export const SetFileUploadBar=(payload)=>({
    type:FileActionTypes.SetFileUploadBar,
    payload:payload
})

