import React, { Component } from 'react';
import './App.css';
import AuthService from './AuthService';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import BookForm from './BookForm';

class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  renderHome() {
    let resultComponent = <Home auth={this.authService}/>;

    if (!this.authService.isAuthenticated()) {
      this.authService.login();
      resultComponent = <div><p>Redirecting to the authentication service...</p></div>
    }
    
    return resultComponent;
  }

  startSession(history) {
    this.authService.handleAuthentication(history);
    return <div><p>Starting session...</p></div>;
  }
  
  createLogoutButton() {
	let button = null;
	
	if (this.authService.isAuthenticated()) {
		button = <button onClick={()=>this.authService.logout()}>Logout</button>;
	}
	
	return button;
  }

  render() {
	const logoutButton =  this.createLogoutButton();
	
    return (
      <div className="App">
        <header className="App-header">
		  {logoutButton}
          <h1 className="App-title">My Bookstore</h1>
        </header>
        <Switch>
          <Route exact path="/" render={() => this.renderHome()}/>
          <Route path="/startSession" render={({history}) => this.startSession(history)}/>
          <Route path="/bookForm" render={({history}) => <BookForm history={history} auth={this.authService}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
