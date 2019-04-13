import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/eventsforms.css';

const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2)
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(data)

}
const EditEventForm = (props) => {
  console.log(props.props)
  return(
  <div   className="eventForm-container">
  <h2>Edit {props.props.Name}</h2>
  <Form
      onSubmit={onSubmit}

      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}   className="eventForm-container">
          <section className="eventForm-inner-reg">
          <div >
            <label>Event Name</label>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder={props.props.Description}
            />
          </div>

          <div>
            <label>Tags</label>
            <Field
              name="tags"
              component="input"
              type="text"
              placeholder={props.props.Tag}
            />
          </div>
          <div   className="description-input-container">
            <label>Description<br/>(max 500 char.)</label>
            <Field
            className="desc"
            type="text"
              name="description"
              placeholder={props.props.Description}
              maxlength="500"
              component="input"

              render={({ input}) => (

                <textarea {...input}/ >

            )}
          />
          </div>



            </section>
              <br/>  <br/>
          <button className="reg-but" type="submit" placeholder="Register">Edit Event</button>
          <pre>{JSON.stringify( values, 0, 2)}</pre>

        </form>
    )}
  />
  </div>
)};
export default EditEventForm ;
