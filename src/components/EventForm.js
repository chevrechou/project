import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import '../styles/eventsforms.css';

const onSubmit = async values => {
  var data=JSON.stringify(values, 0, 2)
  // window.alert(JSON.stringify(values, 0, 2))
  console.log(data)
}
const EventForm = () => (
  <div   className="eventForm-container">
  <h2>Create a new Event</h2>
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
              placeholder="Event Name"
            />
          </div>

          <div>
            <label>Tags</label>
            <Field
              name="tags"
              component="input"
              type="text"
              placeholder="tags"
            />
          </div>
          <div>
            <label>Date</label>
            <Field
              name="Date"
              component="input"
              type="text"
              placeholder="Date"
            />
        
            <label>Location</label>
            <Field
              name="Location"
              component="input"
              type="text"
              placeholder="Location"
            />
          </div>
          <div   className="description-input-container">
            <label>Description<br/>(max 500 char.)</label>
            <Field
            className="desc"
              name="description"
              placeholder="Event Description"
              maxlength="500"
              component="textarea"
              render={({ input}) => (

                <textarea {...input}/ >

            )}
          />
          </div>



            </section>
              <br/>  <br/>
          <button className="reg-but" type="submit" placeholder="Register">Create Event</button>
          <pre>{JSON.stringify( values, 0, 2)}</pre>

        </form>
    )}
  />
  </div>
);
export {EventForm};
