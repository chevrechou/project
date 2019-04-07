import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import '../styles/sidebar.css';

class Admin extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"test",
      userID:"123",
      type:"",
      isLogged:true,

    }
  }
  componentDidMount(){
    this.setState({
      // userID:this.props.userID,
      // username:this.props.username,
    })
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="profile">

        </div>
        <div className="menu">
          <ul>
          <Link to={{ pathname: '/events',
              state: { username: this.state.username,
                      userID:this.state.userID} ,

                    }}>All Events</Link>
          </ul>
          <ul>
          <Link to={{ pathname: '/myevents',
              state: { username: this.state.username,
                      userID:this.state.userID} ,

                           }}>My Events </Link>
          </ul>

          <ul>
            <Link to={{ pathname: '/', isLoggedIn:false }}>Log Out  </Link>
          </ul>

        </div>

      </div>
    );
  }
}

export default Admin;
