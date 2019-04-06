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

const onSubmit = async values => {

  window.alert(JSON.stringify(values, 0, 2))
}
const MyForm = () => (
  <Form
      onSubmit={onSubmit}
className="login-container"
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}>
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
                name="Password"
                component="input"
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
        <br/>
        <button type="submit" placeholder="Login">Login</button>

        {/*  <pre>{JSON.stringify( values, 0, 2)}</pre>*/}
        </form>
    )}
  />
);
 class Login extends Component{
  clicked(){
    console.log("c");
  }
  render(){
    return(

        <div className="login-container">

            <MyForm/>
{/*
          // <div>
          //   <Link to={{ pathname: '/events', isLoggedIn:true }}>Register</Link><br/>
          //   <Link to={{ pathname: '/events', isLoggedIn:false }}>Continue as Guest</Link>

          //</div>*/}
        </div>

  )}
}
export default Login;
