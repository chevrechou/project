import React, { Component } from 'react';


class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      type:""
    }
  }

  render() {
    return (
      <div className="">
        <div className="profile">

        </div>
        <div className="Menu">
          <ul>
            <a href="/events">All Events</a>
          </ul>
          <ul>
            <a href="/">My Events </a>
          </ul>
          <ul>
            <a href="/home"> Log Out  </a>
          </ul>

        </div>

      </div>
    );
  }
}

export default Sidebar;
