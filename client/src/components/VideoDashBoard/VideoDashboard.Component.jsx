import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchVideosStart} from '../../redux/videoDashboard/videoDashboard.actions';
import './VideoDashboard.styles.scss';
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'


const VideoDashboard = ({Video_objects,fetchVideosStart})=>{
    useEffect(()=>{
            fetchVideosStart();
    },[fetchVideosStart])

    return(
        <Container className='video_container'>
            <Row className="justify-content-md-center">
                {
                    (Video_objects.length===0)?(
                        <div className='no_video_statement'>
                                No Videos To Show!
                        </div>
                    ):(
                        Video_objects.map((video)=>{ 
                            return <Col className='video_card_col' md="3" xs="12" sm="4" key={video.title}>
                                        <Card className='card'>
                                            <Link  className='card_link' to={'/video/'+video.video_path+'/'+video.video_name}>
                                            <Card.Img variant="top" src={video.thumbnail_path} alt="Card image"/>
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
    )
}

const mapDispatchToProps=(dispatch)=>({
    fetchVideosStart:()=>dispatch(fetchVideosStart())
})

const mapStateToProps=(state)=>({
    Video_objects:state.video.videos
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoDashboard)