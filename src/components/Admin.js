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
import users from '../users.json';
import 'react-perfect-scrollbar/dist/css/styles.css';

import PerfectScrollbar from 'react-perfect-scrollbar';


class Admin extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"test",
      userID:"123",
      type:"",
      isLogged:true,
      users
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
      <div className="admin-container">
        <div className="sidebar">
          <Sidebar className="sidebar"/>
        </div>
        <section className="right-admin">
        <div className="events-title">Administrator Control</div>
        <PerfectScrollbar className="scroll-container-admin">
        {
          this.state.users.map((user) =>

            <div className="list">
              <ListGroup>
              <ListGroupItem className="item-admin" >
                <ListGroupItemHeading>{user.userName} </ListGroupItemHeading>
                <ListGroupItemText>
                  <div className="user-each">
                    {user.type}
                    <div className="user-each-type">
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
