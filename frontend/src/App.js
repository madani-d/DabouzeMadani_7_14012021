import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Signin from './Containers/Signin/Signin';
import Login from './Containers/Login/Login';
import Profile from './Containers/Profile/Profile';
import Home from './Containers/Home/Home';
import Settings from './Containers/Settings/Settings';
import ChatRoom from './Containers/ChatRoom/ChatRoom';
import ErrorPage from './Containers/ErrorPage/ErrorPage';
import { useSelector } from 'react-redux';
import { restoreConnection } from './redux/connectedReducer/connectedReducer'
import ReportPage from './Containers/ReportPage/ReportPage';

export default function App() {
  
  const connected = useSelector(state => state.connectedReducer.connected)


  if (!connected && localStorage.storageToken) {
    restoreConnection()
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
              <Route path='/chat' exact component={ChatRoom}/>
              <Route path='/profile/:slug' exact component={Profile} />
              <Route path='/settings' exact component={Settings} />
              <Route path='/ReportPage' exact component={ReportPage}/>
            </>
          }
        </Switch>
      </Router>
    </>
  )
}

