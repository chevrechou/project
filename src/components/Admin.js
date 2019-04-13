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
      users:[]
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
        <div className="admin-control">Administrator Control</div>
        <PerfectScrollbar >
        {
          this.state.users.map((user) =>
          <div>
            <div className="list">

              <ListGroup>

              <ListGroupItem className="item" >
                <ListGroupItemHeading>{user.Name} </ListGroupItemHeading>
                <ListGroupItemText>
                  <div className="event-text">
                    {user.type}
                  </div>
                </ListGroupItemText>
              </ListGroupItem>
              </ListGroup>
            </div>
          </div>)
          }
        </PerfectScrollbar>

      </div>
    );
  }
}

export default Admin;
