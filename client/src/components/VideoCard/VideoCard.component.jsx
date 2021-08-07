import React from 'react';
import './VideoCard.styles.scss';
import {Link} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import {connect} from 'react-redux';
import {deleteVideoStart} from '../../redux/userVideoDashboard/userVideoDashboard.actions'


const VideoCard=({video,deleteVideoStart,token})=>{

    const handleDelete = ()=>{
        const result=window.confirm("Are You Sure You Want To Delete-> "+video.video_name+"?");
        if(result)
            deleteVideoStart(video._id,video.video_path,token);
    }

    return(
        <Col className='video_card_col' xl="3" xs="12"  lg="4" md="6">
                <Card className='card' style={{ width: '18rem' }}>
                    <Link  className='card_link' to={'/video/'+video.video_path+'/'+video.video_name}>
                        <Card.Img className='image_styles' variant="top" src={video.thumbnail_path} alt="Video have been taken down as per the policy"/>
                    </Link>
                    <Card.Body>
                        {
                            (video.video_name.length>15)?(
                                <Card.Text className='video_name'>{video.video_name.substr(0,15)+'.....'}</Card.Text>
                            ):(
                                <Card.Text className='video_name'>{video.video_name}</Card.Text>
                            )
                        }
                        <Button variant="danger" onClick={handleDelete}>Delete Video</Button>
                    </Card.Body>
                </Card>
        </Col> 
    )
}

const mapDispatchToProps=(dispatch)=>({
    deleteVideoStart:(video_id,video_path,token)=>{dispatch(deleteVideoStart(video_id,video_path,token))}
})

const mapStateToProps=(state)=>({
    token:state.user.token
})

export default connect(mapStateToProps,mapDispatchToProps)(VideoCard);