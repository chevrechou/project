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
      isLoggedIn:false,
      logOut:false,
      open: false,

    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addEvent=this.addEvent.bind(this);
  }

  componentDidMount(){

    var user=JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    if (!(user==null)) {
        this.setState({
        username:user.username,
        type:user.type,
        isLoggedIn:true,
      })
    }else{
      this.setState({
        username:"",
        type:"guest",
        isLoggedIn:false,
      })
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: false,});
  }

  logOut(){

   localStorage.clear();
   this.setState({logOut:true})
  }
  openModal (){
    this.setState({ open: true })
  };
  closeModal () {
    this.setState({ open: false })
  };
  addEvent(){
    this.setState({
      open:false
    })
    window.alert("Create New Event Successful!")
  }


  render() {
    var user=JSON.parse(localStorage.getItem('user'));

    const isLoggedIn=this.state.isLoggedIn;
    console.log(this.state);


  if (this.state.logOut===true) {
    return <Redirect to={{ pathname: '/', isLoggedIn:false }} />;
  }
    return (
      <div className="sidebar-container">
      <div className="menu">
      {(!isLoggedIn)?
        <div></div>:
        <ul className="userInfo">
          <h2>{this.state.username}  </h2>
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
          {(!isLoggedIn)?  <div></div>:
          <ul>
          <Link to={{ pathname: '/myevents',
              state: { username: this.state.username,
                      userID:this.state.userID} ,}}>
                      My Events </Link>
          </ul>}
          {(this.state.type!=="guest" &&this.state.type!=="Student" ) ?
            <ul onClick={this.openModal}>
              <a> Add Event </a>

            <Popup
            open={this.state.open}
            closeOnDocumentClick

            onClose={this.closeModal.bind(this)}
            >

              <EventForm toggle={this.addEvent.bind(this)}/>

            </Popup>
              </ul>: <div></div>
            }
           {(this.state.type!=="guest") ?<ul onClick={this.logOut}>
            <Link to={{ pathname: '/', isLoggedIn:false }}>Log Out  </Link>
          </ul>:<ul onClick={this.logOut}>
            <Link to={{ pathname: '/', isLoggedIn:false }}>Log In</Link></ul>}
          {(this.state.type==="Admin") ?
          <ul>
          <Link to={{ pathname: '/admin',
              state: { username: this.state.username,
                      userID:this.state.userID} ,

                    }}>Admin</Link>
          </ul>:<div></div> }

        </div>

      </div>
    );
  }
}

export default Sidebar;
