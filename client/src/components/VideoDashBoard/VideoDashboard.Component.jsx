import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchVideosStart} from '../../redux/videoDashboard/videoDashboard.actions';
import './VideoDashboard.styles.scss';
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'


const VideoDashboard = ({Video_objects,fetchVideosStart,token,token_issue_time,history})=>{
    useEffect(()=>{
        const hours_diff=Math.abs(new Date().getTime() - new Date(token_issue_time).getTime())/(1000 * 60 * 60);
        if(hours_diff>1){
            history.push('/signin');
        }
        else{
            console.log(token);
            fetchVideosStart(token,token_issue_time);
        }
    },[token_issue_time,token,fetchVideosStart,history])

    return(
        <Container className='video_container'>
            <Row className="justify-content-md-center">
                {
                    Video_objects.map((video)=>{ 
                        return <Col className='video_card' md="3" xs="12" sm="4" key={video.title}>
                                    <Card>
                                    <Link to={'/video/'+video.video_path}>
                                    <Card.Img variant="top" src={"http://localhost:8000" + video.thumbnail_path} />
                                    <Card.Body>
                                        <Card.Title>{video.title}</Card.Title>
                                    </Card.Body>
                                    </Link>
                                    </Card>
                               </Col> 
                    })
                }
            </Row>
        </Container>
    )
}

const mapDispatchToProps=(dispatch)=>({
    fetchVideosStart:(token,token_issue_time)=>dispatch(fetchVideosStart(token))
})

const mapStateToProps=(state)=>({
    token:'bearer '+state.user.token,
    token_issue_time:state.user.time,
    Video_objects:state.video.videos
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoDashboard)