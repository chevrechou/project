import React from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/eventsforms.css';
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
const onSubmit = async values => {
  values['UserID'] = JSON.parse(localStorage.getItem('user')).userID;
  var data=JSON.stringify(values, 0, 2)
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(values);
  var update= JSON.parse(localStorage.getItem('events'));
  // console.log(update);
  update.push(data);
  localStorage.setItem("events",JSON.stringify(update));
  socket.emit('createEvent', values);

}
const EventForm = ({toggle}) => (
  <div   className="eventForm-container">
  <h2>Create a new Event</h2>
  <Form
      onSubmit={onSubmit}
      // onSubmit={toggle}
      render={({ handleSubmit, form, submitting,pristine, values }) => (
        <form onSubmit={handleSubmit}   className="eventForm-container">
          <section className="eventForm-inner-reg">
          <div >
            <label>Event Name</label>
            <Field
              name="Title"
              component="input"
              type="text"
              placeholder="Event Name"
            />
          </div>
          <section className="short-form">
            <div className="short-form-inner">
              <label>Tags</label>
              <Field
                name="tags"
                component="input"
                type="text"
                placeholder="tags"
              />
            </div>
            <div className="short-form-inner">
              <label>Date</label>
              <Field
                name="DateTime"
                component="input"
                type="date"
                placeholder="Date"
              />
            </div>
            <div>
              <label>Location</label>
              <Field
                name="Location"
                component="input"
                type="text"
                placeholder="Location"
              />
            </div>
          </section>
          <div   className="description-input-container">
            <label>Description<br/>(max 500 char.)</label>
            <Field
            className="desc"
              name="Description"
              placeholder="Event Description"
              maxLength="500"
              component="textarea"
              render={({ input}) => (

                <textarea {...input}/ >

            )}
          />
          </div>
          <div>
            <label>Access Level</label>
            <br/>
            <div class='radio-group'>
              <label class="access-btn">Public</label>
              <Field
                name="AccessLevel"
                component="input"
                type="radio"
                value='0'
                className="access-radio"
              />
            </div>
            <div class='radio-group'>
              <label class="access-btn">Private</label>
              <Field
                name="AccessLevel"
                component="input"
                type="radio"
                value='1'
                className="access-radio"
              />
            </div>
          </div>


            </section>
              <br/>  <br/>
          <button className="reg-but" type="submit" placeholder="Register"
               disabled={submitting || pristine}>Create Event</button>


        </form>
    )}
  />
  </div>
);
export {EventForm};
