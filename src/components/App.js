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



var data = require('../test.json');
var myData=require('../myevents.json');

var userEvents=[];
localStorage.setItem("events",JSON.stringify(data) );
localStorage.setItem("myevents",JSON.stringify(myData) );
var events=JSON.parse(localStorage.getItem('events'));


class App extends Component {
  state={
    allEvents:events
  }

  render() {
    // const dummy=localStorage.setItem("dummy", "DUMMY");
    var event=new Event;

      console.log(events);


      var result = this.state.allEvents.map(person => ({ value: person.id, text: person.Name }));
console.log(result)

    return (

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

  )}
}

export default App;
