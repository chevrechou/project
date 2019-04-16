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

  }

  componentDidMount(){

    var user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
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
//     var username;
//     var type;
// if (!(user==null)){
//     console.log(1)
//     if ( user.Username!=="Guest"){
//       username=user.Username;
//       // type=user.type
//
//       this.setState({
//         isLoggedIn:true
//             })
//     }
//     else{
//         console.log(2)
//       username="Guest"
//       this.setState({
//         isLoggedIn:false
//       })
//     }
//
//     this.setState({
//       userID:this.props.userID,
//       username:username,
//       // type:user.type,
//
//
//     })
//   }else{
//       console.log(3)
//     this.setState({
//       isLoggedIn:false
//     })
//   }
  }

  componentWillReceiveProps(nextProps) {
   this.setState({
     open: false,

   });

 }



 logOut(){

   localStorage.clear();
   this.setState({
     logOut:true
   })
 }
  openModal (){

    this.setState({ open: true })
  };
  closeModal () {
    this.setState({ open: false })
  };


  render() {
    var user=JSON.parse(localStorage.getItem('user'));
    // console.log(JSON.parse(localStorage.getItem('user')));
    // console.log(this.context)

  const isLoggedIn=this.state.isLoggedIn;
    // console.log(isLoggedIn);


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
          {(this.state.type!=="guest") ?
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
