import React from "react";
import './VideoPlayer.styles.scss';

const VideoPlayer = (props) => {  
  return (
    <div className='video_container'>
      <div className='video_name'>
        {props.match.params.name}
      </div>
      <video className='video_player' id="videoPlayer" controls muted="muted" src={'/user/videos/' + props.match.params.title} type="video/mp4" >
      </video>
    </div>
  );
}

export default VideoPlayer