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

var data = require('../test.json');
var myData=require('../myevents.json');

var userEvents=[];

// var events= JSON.parse(localStorage.getItem('events'));
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
    localStorage.setItem("events",JSON.stringify(data) );
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
