import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const onSubmit = async values => {

  window.alert(JSON.stringify(values, 0, 2))
}
const MyForm = () => (
  <Form
      onSubmit={onSubmit}

      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>User Name</label>
            <Field
              name="Username"
              component="input"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="Password"
              component="input"
              type="text"
              placeholder="Password"
            />
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

        <div>
          <div>
            <MyForm/>
          </div>
          <div>
            <Link to={{ pathname: '/events', isLoggedIn:true }}>Register</Link><br/>
            <Link to={{ pathname: '/events', isLoggedIn:false }}>Continue as Guest</Link>

          </div>
        </div>

  )}
}
export default Login;
