import React,{useState} from 'react';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton.component';
import {FileUploadStart} from '../../redux/fileUploader/file.actions'

const UploadVideo = (props)=>{
    const [selectedFile,setSelectedFile]=useState('')
    let {FileUploadStart,token,token_issue_time}=props;
    token='bearer '+token;
    const handleSubmit= async event=>{
        event.preventDefault();
         const hours_diff=Math.abs(new Date() - token_issue_time)/36e5;
        if(hours_diff>1){
            props.history.push('/signin');
        }
        else{
            FileUploadStart(selectedFile,token,token_issue_time);
        }
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
    FileUploadStart:(selectedFile,token)=>{dispatch(FileUploadStart({selectedFile,token}))}
})

const mapStateToProps = (state)=>{
    return{
        token:state.user.token,
        token_issue_time:'bearer '+state.user.time
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadVideo);