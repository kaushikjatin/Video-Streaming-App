import React,{useState} from 'react';
import { connect } from 'react-redux';
import {FileUploadStart,SetFileUploadBar} from '../../redux/fileUploader/file.actions'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/esm/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './upload_video.styles.scss'

const UploadVideo = (props)=>{
    const [selectedFile,setSelectedFile]=useState('')
    let {FileUploadStart,SetFileUploadBar,token,token_issue_time,uploaded}=props;

    
    const handleSubmit= async event=>{
        event.preventDefault();
        const hours_diff=Math.abs(new Date().getTime() - new Date(token_issue_time).getTime())/(1000 * 60 * 60);
        if(hours_diff>1){
            props.history.push('/signin');
        }
        else{
            FileUploadStart(selectedFile,token,token_issue_time);
        }
    }

    const handleChange=event=>{
        SetFileUploadBar(0);
        if(event.target.files[0].size>52428800*1024)
            alert("File size must be <50Gb");
        else{
            setSelectedFile(event.target.files[0]);
        }
    }
  

    return(
        <div className='file_form'>
            {
                uploaded===100?
                (<div className='file_status_message'>FILE UPLOADED SUCCESSFULLY!</div>):
                (<span></span>)
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload A Video</Form.Label>
                    <Form.Control name='file' onChange={handleChange} accept='video/*' type="file" size="lg" />
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
    FileUploadStart:(selectedFile,token)=>{dispatch(FileUploadStart({selectedFile,token}))},
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