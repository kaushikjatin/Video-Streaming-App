import { FileActionTypes } from "./file.types";
const inital_state={
    uploaded:0
}

const FileReducer=(state=inital_state,action)=>{
    switch(action.type){
        case FileActionTypes.FileUploadSuccess:
            return{
                ...state
            }
        case FileActionTypes.FileUploadFailure:
            return{
                ...state,
                error:action.payload
            }
        case FileActionTypes.SetFileUploadBar:
            return{
                ...state,
                uploaded:action.payload
            }
        default:
            return{
                ...state
            }
    }
}

export default FileReducer;