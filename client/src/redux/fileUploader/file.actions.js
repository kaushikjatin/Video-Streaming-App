import {FileActionTypes} from './file.types';

export const FileUploadStart=(selectedFile)=>({
    type:FileActionTypes.FileUploadStart,
    payload:selectedFile
})

export const FileUploadSuccess=(uploadedFile)=>({
    type:FileActionTypes.FileUploadSuccess,
    payload:uploadedFile
})

export const FileUploadFailure=(error)=>({
    type:FileActionTypes.FileUploadFailure,
    payload:error
})

