import {Route,Switch} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn.component';
import SignUp from './components/SignUp/SignUp.component';
import UploadVideo from './components/UploadVideo/upload_video.component'
import VideoDashBoard from './components/VideoDashBoard/VideoDashboard.Component'
import VideoPlayer from './components/VideoPlayer/VideoPlayer.component';
import Navbar from './components/Navbar/Navbar.component';
import Home from './components/Home/home.components';
import UserVideoDashBoardComponent from './components/UserVideoDashBoard/UserVideoDashBoard.component';
import './App.scss';

function App() {
  return (
      <div className="App">
      <Navbar></Navbar>
      <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/signin' component={SignIn}></Route>
          <Route exact path='/signup' component={SignUp}></Route>
          <Route exact path='/upload_video' component={UploadVideo}></Route>
          <Route exact path='/videos' component={VideoDashBoard}></Route>
          <Route exact path='/video/:title/:name' component={VideoPlayer}></Route>
          <Route exact path='/user/videos' component={UserVideoDashBoardComponent}></Route>
      </Switch>
     </div>
  );
}

export default App;
