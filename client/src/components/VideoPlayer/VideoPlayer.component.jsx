import React from "react";

const VideoPlayer = (props) => {  
  return (
    <>
      <video id="videoPlayer" width="650" controls muted="muted" src={'/user/videos/' + props.match.params.title} type="video/mp4" >
      </video>
    </>
  );
}

export default VideoPlayer