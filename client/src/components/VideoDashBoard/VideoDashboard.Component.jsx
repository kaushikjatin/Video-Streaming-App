import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchVideosStart} from '../../redux/videoDashboard/videoDashboard.actions';
import './VideoDashboard.styles.scss';
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import AlertMessage from '../Alert/Alert.component';
import {setVideoDashboardPageAlert} from '../../redux/Alerts/Alert.Actions'



const VideoDashboard = ({Video_objects,alertInfo,fetchVideosStart})=>{
    useEffect(()=>{
            fetchVideosStart();
    },[fetchVideosStart])

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
                                return <Col className='video_card_col' xl="3" xs="12"  lg="4" md="6" key={video.title}>
                                            <Card className='card' style={{ width: '18rem' }}>
                                                <Link  className='card_link' to={'/video/'+video.video_path+'/'+video.video_name}>
                                                <Card.Img className='image_styles' variant="top" src={video.thumbnail_path} alt="Video have been taken down as per the policy"/>
                                                <Card.Body>
                                                    {
                                                        (video.video_name.length>15)?(
                                                            <Card.Text className='video_name'>{video.video_name.substr(0,15)+'.....'}</Card.Text>
                                                        ):(
                                                            <Card.Text className='video_name'>{video.video_name}</Card.Text>
                                                        )
                                                    }
                                                </Card.Body>
                                                </Link>
                                            </Card>
                                    </Col> 
                            })
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}

const mapDispatchToProps=(dispatch)=>({
    fetchVideosStart:()=>dispatch(fetchVideosStart())
})

const mapStateToProps=(state)=>({
    Video_objects:state.video.videos,
    alertInfo:state.alert.videoDashboardInfo
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoDashboard)