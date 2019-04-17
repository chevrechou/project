import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/editForm.css';

const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2)
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(data)

}
const EditEventForm = (props) => {
  console.log(props.props.Name)
  return(
  <div   className="eventForm-container">
  <div className="title-edit"> <h2>Edit {props.props.Name}</h2></div>
  <div   className="editForm-form">
  <Form
      onSubmit={onSubmit}
      className="editForm-form"
        initialValues={props.props}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}   className="eventForm-container">
          <section className="edit-eventForm-inner-reg">
          <div className="edit-input">
            <label className="label-event">Event Name</label>
            <Field
              name="Name"
              component="input"
              type="text"

            />
          </div>

          <div className="edit-input">
            <label className="label-event">Tags</label>
            <Field
              name="Tags"
              component="input"
              type="text"
              initialValues={props.props.Tag}
            />
          </div>
          <div className="edit-input">
            <label className="label-event">Date</label>
            <Field
              name="Date"
              component="input"
              type="text"

            />
          </div>
          <div className="edit-input">
            <label className="label-event">Location</label>
            <Field
              name="Location"
              component="input"
              type="text"

            />
          </div>
          <div   className="description-input-container">
            <label className="label-event">Description<br/>(max 500 char.)</label>
            <Field
              className="desc"

              name="Description"

              maxlength="500"
              component="textarea"

              render={({ input}) => (
                <textarea {...input}/ >
              )}
          />
          </div>

            </section>

        <button className="edit-reg-but" type="submit" placeholder="Register">Edit Event</button>


      </form>
    )}
  />
  </div>
  </div>
)};
export default EditEventForm ;
