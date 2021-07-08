import React,{useState} from 'react';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton.component';
import {FileUploadStart} from '../../redux/fileUploader/file.actions'

const UploadVideo = ({FileUploadStart})=>{
    const [selectedFile,setSelectedFile]=useState('')


    const handleSubmit= async event=>{
        event.preventDefault();
        FileUploadStart(selectedFile);
    }

    const handleChange=event=>{
        if(event.target.files[0].size>52428800)
            alert("File size must be <50Mb");
        else{
            setSelectedFile(event.target.files[0]);
        }
        
    }
  

    return(
        <div>
            <form onSubmit={handleSubmit}>
                    <input
                        name='file'
                        type='file'
                        onChange={handleChange}
                        label='file'
                        accept='video/*'
                        required
                    />
                    <div className='buttons'>
                    <CustomButton type='submit' value='Submit Form'>Upload Video</CustomButton>
                    </div>
                </form>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    FileUploadStart:(selectedFile)=>{dispatch(FileUploadStart(selectedFile))}
})

export default connect(null,mapDispatchToProps)(UploadVideo);