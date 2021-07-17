import {FileActionTypes} from './file.types';

export const FileUploadStart=(payload)=>({
    type:FileActionTypes.FileUploadStart,
    payload:payload
})

export const FileUploadSuccess=(uploadedFile)=>({
    type:FileActionTypes.FileUploadSuccess,
    payload:uploadedFile
})

export const FileUploadFailure=(error)=>({
    type:FileActionTypes.FileUploadFailure,
    payload:error
})

