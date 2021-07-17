import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchVideosStart} from '../../redux/videoDashboard/videoDashboard.actions';
import {Link} from 'react-router-dom'

const VideoDashboard = ({Video_objects,fetchVideosStart,token,token_issue_time})=>{
    useEffect(()=>{
        const hours_diff=Math.abs(new Date() - token_issue_time)/36e5;
        if(hours_diff>1){
            this.props.history.push('/signin');
        }
        else{
            console.log(token);
            fetchVideosStart(token,token_issue_time);
        }
    },[])

    return(
        <div className='videos_dashboard_container'>
            {
                // Video_objects.map((video)=>{ return <VideoContainer video></VideoContainer>})
                Video_objects.map((video)=>{ return <Link to={'/video/'+video.video_path}>{video.title}</Link>})
            }
            <div>kdcbdha</div>
        </div>
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