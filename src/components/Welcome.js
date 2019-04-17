import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import '../styles/welcome.css'
import Login from "./Login";
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
var eventData = [];
var myData= [];
socket.emit('loadEvents', { userAC: 1, limit: 50 });
socket.on('loadEventsRepsonse', function (data) {
  eventData = data;
  console.log('Grabbing data...');
  console.log(eventData);
}.bind(this));
var userEvents=[];
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      userID: 0,
      type:"guest",
      isLoggedIn:false
    }
  }
  componentDidMount(){
    localStorage.setItem("events",JSON.stringify(eventData) );
    localStorage.setItem("myevents",JSON.stringify(myData) );
  }
  render() {
    return (
      <div className="welcome-container">
          <section className="welcome-left">
            <div className="welcome-logo"></div>

            <Login/>
            <br/>
              <h2>  <Link to={{ pathname: '/register', isLoggedIn:false }} className = "welcome-link"> Register </Link><br/>
            </h2>
            or<br/>
            <h4>
              <Link to={{ pathname: '/events', isLoggedIn:false, isGuest:true  }} className = "welcome-link">Continue as Guest </Link>
            </h4>
          </section>
      </div>
    );
  }
}

export default Welcome;
