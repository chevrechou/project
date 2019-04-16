import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import "../styles/login.css";
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
class Login extends Component{
  state={
    isAuthenticated:false,
    posts: [],
  }
  render(){
  const onSubmit = async values => {
    console.log(values);

   socket.emit('authenticate', {user: values.Username, pass: values.Password});
   socket.on('authenticateResponse', function(data){
    if(data != -1){
      console.log("SUCCESS");
      var info = data.split(",");
      console.log(info);
      var userType = '';
      if(info[2] == 1)
        userType = 'Student';
      else if (info[2] == 2)
        userType = 'Faculty';
      else if (info[2] == 3)
        userType = 'Admin';
      var user = {
        username: info[1],
        userID: info[0],
        type: userType,
        isLoggedIn:true,
        isGuest:false
      }
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("set storage");
      socket.emit('loadEvents', { userAC: info[2], limit: 50 });
      socket.on('loadEventsRepsonse', function (data) {
        // console.log(data);
        localStorage.setItem("events", JSON.stringify(data));
      }.bind(this));
      socket.emit('loadMyEvents', info[0]);
      socket.on('loadMyEventsResponse', function(events){
        // console.log(events);
        localStorage.setItem("myevents", JSON.stringify(events));
      });
      this.setState({
        isAuthenticated: true
      })
      
    }
    else {
      console.log("FAILED");
      document.getElementById("error").innerHTML = "Invalid credentials";
    }
  }.bind(this));
}
const MyForm = () => (
  <Form
      onSubmit={onSubmit}
      className="login-container"
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}>
        <section className="login-section">
          <div className="input-field-container">
            <div className="username-field">
              <label>User Name</label>
              <Field
              className="inputField"
                name="Username"
                component="input"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="password-field">
              <label>Password</label>
              <Field
                className="inputField"
                name="Password"
                component="input"
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
          <div id="error">

          </div>
        </section>
        <button type="submit" placeholder="Login" class="login">Login</button>

        {/*  <pre>{JSON.stringify( values, 0, 2)}</pre>*/}
        </form>
    )}
  />
);


if (this.state.isAuthenticated) {
  return <Redirect to={{ pathname: '/events', isLoggedIn:true,isGuest:false }} />;
}
    return(

        <div className="login-container">

            <MyForm/>

        </div>

  )}
}
export default Login;
