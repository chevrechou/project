import React from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/editForm.css';
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
var EventID = '';
const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2);
  var user = localStorage.getItem('user');
  console.log(user);
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(EventID);
  console.log(data);
  socket.emit('updateEvent', {EventID: EventID, User: user, values: data});
}
const EditEventForm = ({props, toggle}) => {
  console.log({props}.props)
  EventID = {props}.props.EventID;
  return(
  <div   className="eventForm-container">
  <div className="title-edit"> <h2>Edit {{props}.props.Title}</h2></div>
  <div   className="editForm-form">
  <Form
      onSubmit={onSubmit}
      // onSubmit={toggle}
      className="editForm-form"
       initialValues={{props}.props}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit}   className="eventForm-container">
          <section className="edit-eventForm-inner-reg">
          <div className="edit-input">
            <label>Event Name</label>
            <Field
              name="Title"
              component="input"
              type="text"

            />
          </div>
        <section className="short-form">
          <div className="edit-input">
            <label>Tags</label>
            <Field
              name="Tags"
              component="input"
              type="text"
              // placeholder={props.props.Tag}
              // value={props.props.Tag}
            />
          </div>
          <div className="edit-input">
            <label>Date</label>
            <Field
              name="DateTime"
              component="input"
              type="date"

            />
          </div>
          <div className="edit-input">
            <label>Location</label>
            <Field
              name="Location"
              component="input"
              type="text"

            />
          </div>
        </section >
          <div   className="description-input-container">
            <label>Description<br/>(max 500 char.)</label>
            <Field
            className="desc"
            // type="text"
              name="Description"
              // placeholder={props.props.Description}
              // value = {props.props.Description}
              maxLength="500"
              component="textarea"

              render={({ input}) => (

                <textarea {...input}/ >

            )}
          />
          </div>

            </section>
          <br/>
        <button className="edit-reg-but" type="submit" placeholder="Register">Edit Event</button>
      </form>
    )}
  />
  </div>
  </div>
)};
export default EditEventForm;
