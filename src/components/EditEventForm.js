import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/editForm.css';

const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2)
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(data)

}
const EditEventForm = (props) => {
  console.log(props.props)
  return(
  <div   className="eventForm-container">
  <div className="title-edit"> <h2>Edit {props.props.Name}</h2></div>
  <div   className="editForm-form">
  <Form
      onSubmit={onSubmit}
      className="editForm-form"
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}   className="eventForm-container">
          <section className="edit-eventForm-inner-reg">
          <div className="edit-input">
            <label>Event Name</label>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder={props.props.Description}
            />
          </div>

          <div className="edit-input">
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
            // type="text"
              name="description"
              placeholder={props.props.Description}
              maxlength="500"
              component="textarea"

              render={({ input}) => (

                <textarea {...input}/ >

            )}
          />
          </div>

            </section>
          <br/>  <br/>
        <button className="edit-reg-but" type="submit" placeholder="Register">Edit Event</button>
        <pre>{JSON.stringify( values, 0, 2)}</pre>

      </form>
    )}
  />
  </div>
  </div>
)};
export default EditEventForm ;