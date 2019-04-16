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
import Authenticator from '../util/Authenticator';


class Login extends Component{
  state={
    isAuthenticated:false,
  }
  render(){
  
    const onSubmit = async values => {
    console.log(values);
    this.setState({
      isAuthenticated: true
    })

    var user = {
                username: values.Username,
                type: 'admin',
                isLoggedIn:true,
                isGuest:false,
              }
    const storage=localStorage.setItem("user",JSON.stringify(user));

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
