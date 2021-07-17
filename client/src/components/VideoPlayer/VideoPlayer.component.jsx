import React from "react";
import VideoJS from './VideoJs.component' // point to where the functional component is stored

const VideoPlayer = (props) => {

  const videoJsOptions = { // lookup the options in the docs for more options
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://localhost:8000/api/videos/' + props.match.params.title,
      type: 'video/mp4'
    }]
  }
  
  return (
    <>
      <div>Rest of app here</div>
      
      <VideoJS { ...videoJsOptions }/>
      
      <div>Rest of app here</div>
    </>
  );
}

export default VideoPlayer