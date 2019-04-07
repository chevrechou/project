import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Home from './Home.js';
import Welcome from './Welcome.js';
import Events from './Events.js';
import {BrowserRouter, Route} from 'react-router-dom';
import MyEvents from './MyEvents';
import Register from './Register';
import Admin from './Admin';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Welcome />
            </div>
          )}/>
          <Route exact={true} path='/register' render={() => (
            <div className="Register">
              <Register />
            </div>
          )}/>
          <Route exact={true} path='/home' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/events' render={(props) => (
            <div className="App">
              <Events {...props}  />
            </div>

          )}/>
          <Route exact={true} path='/myevents' render={(props) => (
            <div className="App">
              <MyEvents {...props}  />
            </div>

          )}/>
          <Route exact={true} path='/admin' render={(props) => (
            <div className="App">
              <Admin {...props}  />
            </div>

          )}/>

        </div>
      </BrowserRouter>
  )}
}

export default App;
