import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signin from './Containers/Signin/Signin';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';
import Home from './Containers/Home/Home';
import Settings from './Containers/Settings/Settings';
import ErrorPage from './Containers/ErrorPage/ErrorPage';
import { useSelector } from 'react-redux';
import { RestoreConnection } from './utils/restoreConnection'


export default function App() {
  
  const connected = useSelector(state => state.connectedReducer.connected)

  if (!connected && localStorage.storageToken) {
    RestoreConnection(JSON.parse(localStorage.storageToken).token)
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login'/>
          </Route>
          <Route path='/signin' exact component={Signin} />
          <Route path='/login' exact component={Login} />
          <Route path='/errorPage' exact component={ErrorPage} />
          {connected &&
            <>
              <Route path='/home' exact component={Home} />
              <Route path='/profile/:slug' exact component={Profile} />
              <Route path='/settings' exact component={Settings} />
            </>
          }


        </Switch>
      </Router>
    </>
  )
}

