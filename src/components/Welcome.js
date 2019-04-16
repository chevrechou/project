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


class Welcome extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      type:"guest",
      isLoggedIn:false
    }
  }
  render() {
    var user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
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
              <Link to={{ pathname: '/events', isLoggedIn:false }} className = "welcome-link">Continue as Guest </Link>
            </h4>
          </section>




      </div>
    );
  }
}

export default Welcome;
