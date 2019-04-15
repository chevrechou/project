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
import Event from '../models/Event';
var data = require('../myevents.json');

var userEvents=[];
localStorage.setItem("events",JSON.stringify(data) );
var user=JSON.parse(localStorage.getItem('user'));
var test={ 'one': 1, 'two': 2, 'three': 3 };

const MyUser = React.createContext(test);
class App extends Component {
  state={
    allEvents:JSON.parse(localStorage.getItem("events"))
  }
  getData(){

  }
  render() {
    const dummy=localStorage.setItem("dummy", "DUMMY");
    var event=new Event;
    console.log("all events:" + (this.state.allEvent))
      console.log(event);
      console.log(localStorage.getItem("dummy"));
    return (
        <MyUser.Provider>
         <BrowserRouter>
        <div>
          <Route exact={true} exact path='/' render={() => (
            <div className="App">
              <Welcome />
            </div>
          )}/>
          <Route path='/register' render={() => (
            <div className="Register">
              <Register />
            </div>
          )}/>
          <Route path='/home' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route path='/events' render={(props) => (
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
        </MyUser.Provider>
  )}
}

export default App;
