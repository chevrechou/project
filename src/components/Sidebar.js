import React, { Component } from 'react';
import axios from 'axios';
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
      username:"",
      userID:"",
      type:"",
      isLogged:"false",
      open: false,

    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount(){
    var user=JSON.parse(localStorage.getItem('user'));
    this.setState({
      userID:this.props.userID,
      username:localStorage.getItem("username"),
      type:user.type,


    })
  }
  componentWillReceiveProps(nextProps) {
   this.setState({
     open: false,
       username:localStorage.getItem("username")
   });

 }



 logOut(){
   console.log("LOGGED OUT");
   localStorage.clear();
   this.setState({
     isLoggedIn:false
   })
 }
  openModal (){
    console.log("opening modal");
    this.setState({ open: true })
  };
  closeModal () {
    this.setState({ open: false })
  };


  render() {
    var user=JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));
    console.log(this.context)
  const isLoggedIn=this.state.isLoggedIn;
  if (this.state.isLogged===false) {
    return <Redirect to={{ pathname: '/', isLoggedIn:false }} />;
  }
    return (
      <div className="sidebar-container">
      <div className="menu">
      {(isLoggedIn)?
        <div></div>:
        <ul className="userInfo">
          <h2>{user.Username}  </h2>
          <h5>{this.state.type}
          </h5>
        </ul>
      }

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
          <ul onClick={this.logOut}>
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
