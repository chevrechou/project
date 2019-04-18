import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Sidebar from './Sidebar';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import '../styles/admin.css';
// import users from '../users.json';
import 'react-perfect-scrollbar/dist/css/styles.css';
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');

import PerfectScrollbar from 'react-perfect-scrollbar';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userID: "",
      type: "",
      isLogged: true,
      users: []
    }
  };
  updateAccessLevel = async (data) =>{
    // console.log(data);
    var string = 'input[name="'+data+'"]:checked';
    var val = document.querySelector(string).value;
    socket.emit('changeAccessLevel', {UserID:data, AccessLevel: val});
    var newAC = '';
    if(val == 1)
      newAC = 'Student'
    else if (val == 2)
      newAC = 'Faculty'
    else
      newAC = 'Admin'
    document.getElementsByClassName("accessLevel")[data-1].innerHTML = newAC.italics();
    // console.log(newAC);
  };
  componentDidMount() {
    var dat = [];
    socket.emit('getAllUsers');
    socket.on('getUsersResponse', function (data) {
      dat = (data);
      localStorage.setItem('users', JSON.stringify(dat));
      this.setState({
        users: JSON.parse(localStorage.getItem('users'))
      }, function(){
        // console.log(JSON.parse(localStorage.getItem('users')));
      });
    }.bind(this));
  }
  render() {
    return (
      <div className="admin-container">
        <div className="sidebar">
          <Sidebar className="sidebar" />
        </div>
        <section className="right-admin">
          <div className="events-title">Administrator Control</div>
          <PerfectScrollbar className="scroll-container-admin">
            {
              this.state.users.map((user) =>

                <div className="list" key={user.userID}>
                  <ListGroup>
                    <ListGroupItem className="item-admin" >
                      <ListGroupItemHeading>
                      {user.username}'s current access level:
                        { (user.accessLevel===1)?<div class="accessLevel"><i>Student</i></div>:<div></div>}
                        { (user.accessLevel===2)?<div class="accessLevel"><i>Faculty</i></div>:<div></div>}
                        { (user.accessLevel===3)?<div class="accessLevel"><i>Admin</i></div>:<div></div>}
                      </ListGroupItemHeading>
                      <ListGroupItem className="btn-group-container">
                      Change to:  <br/>
                        <div class="btn-container">
                          <label class="btn-label">Student</label>
                          <input class="admin-btn" type="radio" name={user.userID} value="1" onClick={() => this.updateAccessLevel(user.userID)}/>
                        </div>
                        <div class="btn-container">
                          <label class="btn-label">Faculty</label>
                          <input class="admin-btn" type="radio" name={user.userID} value="2" onClick={() => this.updateAccessLevel(user.userID)}/>
                        </div>
                        <div class="btn-container">
                          <label class="btn-label">Admin</label>
                          <input class="admin-btn" type="radio" name={user.userID} value="3" onClick={() => this.updateAccessLevel(user.userID)}/>
                        </div>
                      </ListGroupItem>
                      <ListGroupItemText className="item-admin-text">
                        <div className="user-each">
                          <div className="user-each-type">
                            {user.type}
                          </div>
                        </div>
                      </ListGroupItemText>
                    </ListGroupItem>
                  </ListGroup>

                </div>)
            }
          </PerfectScrollbar>
        </section>
      </div>
    );
  }
}

export default Admin;
