import React, { Component } from 'react';
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
const EditEventForm = (props) => {
  console.log(props.props)
  EventID = props.props.EventID;
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
              value={props.props.Description}
            />
          </div>

          <div className="edit-input">
            <label>Tags</label>
            <Field
              name="tags"
              component="input"
              type="text"
              placeholder={props.props.Tag}
              value={props.props.Tag}
            />
          </div>
          <div className="edit-input">
            <label>Date</label>
            <Field
              name="Date"
              component="input"
              type="text"
              placeholder={props.props.Date}
              value={props.props.Date}
            />
          </div>
          <div className="edit-input">
            <label>Location</label>
            <Field
              name="Location"
              component="input"
              type="text"
              placeholder={props.props.Location}
              value={props.props.Location}
            />
          </div>
          <div   className="description-input-container">
            <label>Description<br/>(max 500 char.)</label>
            <Field
            className="desc"
            // type="text"
              name="description"
              placeholder={props.props.Description}
              value = {props.props.Description}
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
      

      </form>
    )}
  />
  </div>
  </div>
)};
export default EditEventForm;
