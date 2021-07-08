import {Route} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn.component';
import SignUp from './components/SignUp/SignUp.component';
import UploadVideo from './components/UploadVideo/upload_video.component'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={SignIn}></Route>
      <Route exact path='/signin' component={SignIn}></Route>
      <Route exact path='/signup' component={SignUp}></Route>
      <Route exact path='/upload_video' component={UploadVideo}></Route>
    </div>
  );
}

export default App;
