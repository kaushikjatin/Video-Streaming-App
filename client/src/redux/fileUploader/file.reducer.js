import { FileActionTypes } from "./file.types";
const inital_state={
    uploadedFiles:[]
}

const FileReducer=(state=inital_state,action)=>{
    switch(action.type){
        case FileActionTypes.FileUploadSuccess:
            return{
                ...state,
                uploadedFiles:uploadedFiles.append(action.payload)
            }
        case FileActionTypes.FileUploadFailure:
            return{
                ...state,
                error:action.payload
            }
    }
}

export default FileReducer;