import {Route} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn.component';

function App() {
  return (
    <div className="App">
      <Route exact={true} url='/signin' component={SignIn}></Route>
    </div>
  );
}

export default App;
