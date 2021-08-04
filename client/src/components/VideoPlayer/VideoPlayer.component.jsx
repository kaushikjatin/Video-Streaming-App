import React from "react";
import './VideoPlayer.styles.scss';
import AlertMessage from '../Alert/Alert.component';
import {setVideoPlayerPageAlert} from '../../redux/Alerts/Alert.Actions'
import { connect } from "react-redux";


const VideoPlayer = (props) => {  

  const alertInfo=props.alertInfo;
  return (
    <div>
      <AlertMessage setAlertInfo={setVideoPlayerPageAlert} alertInfo={alertInfo}></AlertMessage>
      <div className='video_container'>
        <div className='video_name'>
          {props.match.params.name}
        </div>
        <video className='video_player' id="videoPlayer" controls muted="muted" src={'/user/videos/' + props.match.params.title} type="video/mp4" >
        </video>
      </div>
    </div>
  );
}

const mapStateToProps=(state)=>({
  alertInfo:state.alert.videoPlayerInfo
})

export default connect(mapStateToProps,null)(VideoPlayer);