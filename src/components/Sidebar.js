import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      userID:"",
      type:"",
      isLogged:true,

    }
  }
  componentDidMount(){
    this.setState({
      userID:this.props.userID,
      username:this.props.username,
    })
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
            <Link to={{ pathname: '/home', isLoggedIn:false }}>Log Out  </Link>
          </ul>

        </div>

      </div>
    );
  }
}

export default Sidebar;
