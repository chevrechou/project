import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/register.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2);
  // window.alert(JSON.stringify(values, 0, 2));
  console.log(data);
}
const MyForm = () => (
  <div   className="register-container">
  <Form
      onSubmit={onSubmit}

      render={({ handleSubmit, form, submitting, values,pristine }) => (
        <form onSubmit={handleSubmit}   className="registrationForm-container">
          <section className="inner-reg">
          <div >
            <label>User Name</label>
            <Field
              name="Username"
              component="input"
              type="text"
              placeholder="Username"
            />
          </div>
          <div >
            <label>Email </label>
            <Field
              name="Email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="Password"
              component="input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field
              name="PasswordConfirmation"
              component="input"
              type="password"
              placeholder="Re-type Password"
            />
          </div>



            </section>
              <br/>  <br/>
          <button className="reg-but" type="submit" placeholder="Register">Register</button>
          <pre>{JSON.stringify( values, 0, 2)}</pre>

        </form>
    )}
  />
  </div>
);
class Register extends Component{
 clicked(){
   console.log("r");
 }
 render(){
   return(

       <div className="register-container">
            <div className="content"><label>Register </label>
           <MyForm/>
           </div>
           <div className="guest-opt">

             <Link to={{ pathname: '/events', isLoggedIn:false }}>Continue as Guest </Link>

           </div>

       </div>

 )}
}
export default Register;
