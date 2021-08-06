import React,{useState} from 'react';
import { connect } from 'react-redux';
import {FileUploadStart,SetFileUploadBar} from '../../redux/fileUploader/file.actions'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/esm/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './upload_video.styles.scss'

const UploadVideo = (props)=>{
    const [selectedFile,setSelectedFile]=useState('');
    const [videoName,setVideoName]=useState('');
    let {FileUploadStart,SetFileUploadBar,token,token_issue_time,uploaded}=props;

    
    const handleSubmit= async event=>{
        event.preventDefault();
        const hours_diff=Math.abs(new Date().getTime() - new Date(token_issue_time).getTime())/(1000 * 60 * 60);
        if(hours_diff>1){
            props.history.push('/signin');
        }
        else{
            FileUploadStart(selectedFile,token,videoName);
        }
    }

    const handleChange=event=>{
        const {name}=event.target;
        if(name==='video_name'){
            setVideoName(event.target.value);
        }else{
            SetFileUploadBar(0);
            if(event.target.files[0].size>20 * 1000 * 1000) // this size is in bytes
                alert("File size must be <20 Megabytes");
            else{
                setSelectedFile(event.target.files[0]);
            }
        }
    }
  

    return(
        <div className='file_form'>
            {
                uploaded===100?
                (<div>
                <div className='file_status_message'>FILE UPLOADED SUCCESSFULLY!</div>
                <div className='file_status_message2'>YOUR FILE WILL BE TAKEN DOWN AFTER A DAY ACCORDING TO THE POLICY!</div>
                </div>):
                (<span></span>)
            }
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control type="text" onChange={handleChange} placeholder="Enter the title to be shown" name='video_name'/>
                </Form.Group>

                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload A Video</Form.Label>
                    <Form.Control name='file' onChange={handleChange} accept='video/*' type="file" size="lg"/>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className='submit_button'>
                        Submit
                    </Button>
                </div>
          </Form>
          <ProgressBar className='progress_bar' animated variant="success" now={uploaded} />
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    FileUploadStart:(selectedFile,token,videoName)=>{dispatch(FileUploadStart({selectedFile,token,videoName}))},
    SetFileUploadBar:(value)=>{dispatch(SetFileUploadBar(value))}
})

const mapStateToProps = (state)=>{
    return{
        token:'bearer '+state.user.token,
        token_issue_time:state.user.time,
        uploaded:state.uploaded_file.uploaded
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadVideo);