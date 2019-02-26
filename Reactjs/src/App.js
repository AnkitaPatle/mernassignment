import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginComponent from './components/LoginComponent.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import RoleComponent from './components/RoleComponent.jsx';
import UserComponent from './components/UserComponent.jsx';
import UserListComponent from './components/UserListComponent.jsx';
import PersonInfoComponent from './components/PersonInfoComponent.jsx';
import LogoutComponent from './components/LogoutComponent.jsx';
import PersonApprovedListComponent from './components/PersonApprovedListComponent.jsx';
import PersonPendingListComponent from './components/PersonPendingListComponent.jsx';
import PersonRejectedListComponent from './components/PersonRejectedListComponent.jsx';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>

          <Switch>
            <Route exact path='/' component={LoginComponent}/>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/home' component={HomeComponent}/>
            <Route path='/role' component={RoleComponent}/>
            <Route path='/users' component={UserComponent}/>
            <Route path='/userslist' component={UserListComponent}/>
            <Route path='/personinfo' component={PersonInfoComponent}/>
            <Route path='/approved' component={PersonApprovedListComponent}/>
            <Route path='/pending' component={PersonPendingListComponent}/>
            <Route path='/rejected' component={PersonRejectedListComponent}/>
            <Route path='/login' component={LogoutComponent}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

// <Route path='/personinfo:UserId' component={PersonInfoComponent}/>

export default App;
