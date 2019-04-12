 import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import '../styles/sidebar.css';
import Popup from 'reactjs-popup';
import {EventForm} from './EventForm';

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"test",
      userID:"123",
      type:"guest",
      isLogged:true,
      open: false,

    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }
  componentDidMount(){
    this.setState({
      userID:this.props.userID,
      username:this.props.username,
    })
  }
  componentWillReceiveProps(nextProps) {
   this.setState({
     open: false
   });
 }



  openModal (){
    console.log("opening modal");
    this.setState({ open: true })
  };
  closeModal () {
    this.setState({ open: false })
  };


  render() {
    console.log(this.state.type)

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
          {(this.state.type=="guest") ?
            <ul onClick={this.openModal}>
              <a> Add Event </a>

            <Popup
            open={this.state.open}
            closeOnDocumentClick

            onClose={this.closeModal.bind(this)}
            >

              {EventForm}

            </Popup>
              </ul>: <div></div>
            }
          <ul>
            <Link to={{ pathname: '/', isLoggedIn:false }}>Log Out  </Link>
          </ul>
          <ul>
          <Link to={{ pathname: '/admin',
              state: { username: this.state.username,
                      userID:this.state.userID} ,

                    }}>Admin</Link>
          </ul>

        </div>

      </div>
    );
  }
}

export default Sidebar;
