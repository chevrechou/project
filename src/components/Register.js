import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

const onSubmit = async values => {

  window.alert(JSON.stringify(values, 0, 2))
}
const MyForm = () => (
  <Form
      onSubmit={onSubmit}

      render={({ handleSubmit, form, submitting, values,pristine }) => (
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
          <div>
            <label>Password</label>
            <Field
              name="Password"
              component="input"
              type="text"
              placeholder="Re-type Password"
            />
          </div>


        <br/>
          <div>
            <label>Notes</label><br/>
            <Field name="notes" component="textarea" placeholder="Notes" />
          </div>

          <pre>{JSON.stringify( values, 0, 2)}</pre>
        </form>
    )}
  />
);
const Register = () => {
  return(
    <div>
      <div>
        <button> Login </button>
        <MyForm/>
      </div>
        <a href="/">Go home</a>
    </div>
  )
}
export default Register;
