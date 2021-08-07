import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchVideosStart} from '../../redux/userVideoDashboard/userVideoDashboard.actions';
import './UserVideoDashBoard.styles.scss';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import AlertMessage from '../Alert/Alert.component';
import {setVideoDashboardPageAlert} from '../../redux/Alerts/Alert.Actions';
import VideoCard from '../VideoCard/VideoCard.component';



const UserVideoDashboard = ({Video_objects,alertInfo,fetchVideosStart,currentUser_id,token})=>{
    useEffect(()=>{
            if(currentUser_id!=null)
                fetchVideosStart(currentUser_id,token);
    },[fetchVideosStart,currentUser_id,token])

    return(
        <div>
            <AlertMessage setAlertInfo={setVideoDashboardPageAlert} alertInfo={alertInfo}></AlertMessage>
            <Container className='video_container'>
                <Row className="justify-content-md-center">
                    {
                        (Video_objects.length===0)?(
                            <div className='no_video_statement'>
                                    No Videos To Show!
                            </div>
                        ):(
                            Video_objects.map((video)=>{ 
                                return <VideoCard video={video} key={video.title}></VideoCard>
                            })
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    fetchVideosStart:(currentUser_id,token)=>dispatch(fetchVideosStart(currentUser_id,token))
})

const mapStateToProps=(state)=>({
    Video_objects:state.userVideo.userVideos,
    alertInfo:state.alert.videoDashboardInfo,
    currentUser_id:state.user.currentUser_id,
    token:state.user.token
})

export default connect(mapStateToProps,mapDispatchToProps)(UserVideoDashboard)