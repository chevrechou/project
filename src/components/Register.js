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
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
class Register extends Component {
  state = {
    redirectToNewPage: false
  }


  clicked() {
    // console.log("r");
  }
  render() {
    const onSubmit = async values => {
      console.log(values);
      if (values.Password != values.PasswordConfirmation) {
        document.getElementById('error').innerHTML = 'Passwords do not match!';
        console.log("INVALID PASS");
      }
      else {
        // console.log('passwords match!')
        socket.emit('register', values);
        socket.on('registerResponse', function(data){
          // console.log("response received");
          if(data != -1){
            var user = {
              username: values.Username,
              userID: data,
              type: 'Student',
              isGuest: "false",
              isLoggedIn: "true"
            }
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({  isAuthenticated: true })
          }
          else {
            document.getElementById('error').innerHTML = 'Username was already taken!';
          }
        }.bind(this));
      }
    }

    const MyForm = () => (
      <div className="register-container">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, values, pristine }) => (
            <form onSubmit={handleSubmit} className="registrationForm-container">
              <section className="inner-reg">
                <div >
                  <h5 className="reg-label" >User Name</h5>
                  <Field
                    name="Username"
                    component="input"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div >
                  <h5 className="reg-label">Email </h5>
                  <Field
                    name="Email"
                    component="input"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <h5 className="reg-label">Password</h5>
                  <Field
                    name="Password"
                    component="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <h5 className="reg-label" >Confirm Password</h5>
                  <Field
                    name="PasswordConfirmation"
                    component="input"
                    type="password"
                    placeholder="Re-type Password"
                  />
                </div>
                <div id="error"></div>


              </section>
              <br />  <br />
              <button className="reg-but" type="submit" placeholder="Register">
                <h5> Register </h5> </button>


            </form>
          )}
        />
      </div>
    )
    if (this.state.isAuthenticated) {
      return <Redirect to={{ pathname: '/events', isLoggedIn: true, isGuest: false }} />;
    }
    return (

      <div className="register-container">
        <div className="content"><h2>Register </h2>
          <MyForm />
        </div>
        <div className="guest-opt">
          <h3>
          <Link to={{ pathname: '/events', isLoggedIn: false, isGuest: true }} className="guest-opt">Continue as Guest </Link>
          </h3>
        </div>

      </div>

    )
  }
}
export default Register;
