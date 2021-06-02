import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signin from './Containers/Signin/Signin';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';
import Home from './Containers/Home/Home';
import Settings from './Containers/Settings/Settings';


function App() {


  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login'/>
          </Route>
          <Route path='/signin' exact component={Signin} />
          <Route path='/login' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/profile/:slug' exact component={Profile} />
          <Route path='/settings' exact component={Settings} />
        </Switch>
      </Router>
    </>
  )
}


export default App;
