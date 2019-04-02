import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import '../styles/welcome.css'

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
    return (
      <div className="welcome-container">

          <section className="welcome-left">
            <h2> Welcome <br/><br/>
            <a href="/home">Sign In</a><br/>
            <a href="/home"> Register </a><br/>
            </h2> <br/>
          </section>
          <section className="welcome-right">
            <h4>
              <Link to={{ pathname: '/events', isLoggedIn:false }}>Continue as Guest </Link>
            </h4>
          </section>


      </div>
    );
  }
}

export default Welcome;
