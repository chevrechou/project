import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

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
const Login = () => {
  return(
    <div>
      <div>
        <MyForm/>
      </div>
      <div>
        <a href="/register">Register</a><br/>
        <a href="/events"> Continue as Guest </a>
      </div>
    </div>
  )
}
export default Login;
