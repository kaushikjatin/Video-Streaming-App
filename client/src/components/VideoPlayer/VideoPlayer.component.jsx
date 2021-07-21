import React from "react";
import VideoJS from './VideoJs.component' // point to where the functional component is stored

const VideoPlayer = (props) => {

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://localhost:8000/user/videos/' + props.match.params.title,
      type: "video/mp4"
    }]
  }
  
  return (
    <>
      <div>Rest of app here</div>
      
      {/* <video id="videoPlayer" width="650" controls muted="muted" autoPlay>
           <source src={'http://localhost:8000/user/videos/' + props.match.params.title} type="video/mp4" />
      </video> */}
      <VideoJS { ...videoJsOptions }/>
      
      <div>Rest of app here</div>
    </>
  );
}

export default VideoPlayer