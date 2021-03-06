import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import "../styles/events.css";
import ScrollArea from 'react-scrollbar';
import SearchInput, { createFilter } from 'react-search-input';
// import data from "../test.json";
import Popup from 'reactjs-popup'
import SearchField from "react-search-field";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { Socket } from 'net';
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');


var user = JSON.parse(localStorage.getItem('user'));
console.log('Init events');
console.log(user);


class Events extends Component {
  constructor(props) {
    super(props);
    console.log("HERE");

    this.searchUpdated = this.searchUpdated.bind(this)
    this.state = {
      username: "",
      userID: "",
      type: "",
      isLoggedIn: "",
      searchTerm: "",
      open: false,
      data: [],
      description:"",
      filtered: [],
      added: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search = this.search.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.eventUpdateReceiver();
  }

  eventUpdateReceiver(){
    // Remove all other intervals
    // New interval!
    console.log("Event Update Reciever started!");
    
    console.log("Listening for updates...");
    socket.on('pollEventsResponse', function(resp){
        console.log("Recieved update from socket!");
        if(resp != -1){
            // Something here!
            console.log(resp);
            console.log("Update your events!");
            // window.alert("Events changed, please refresh!");
        }
    });
    var id = setInterval( function() {
      var highestTimeoutId = id;
      for (var i = 0 ; i < highestTimeoutId ; i++) {
          clearTimeout(i); 
      }
      socket.emit('pollEvents');
    }, 2000);

  };

  componentDidMount() {

    if (this.props.location.isLoggedIn === false) {
      console.log(JSON.parse(localStorage.getItem('events')));
      // console.log('GUEST USER');
      var user = {
        username: "Guest",
        userID: 0,
        accessLevel: 0,
        type: 'guest',
        isGuest: "true",
        isLoggedIn: "false",
      }
      // console.log("USER ACLEVL" + user.accessLevel);
      socket.emit('loadEvents', { userAC: user.accessLevel, limit: 50 });
      socket.on('loadEventsRepsonse', function (data) {
        // console.log("Gather appropriate events");
        localStorage.setItem("events", JSON.stringify(data));
        // console.log(data);
        this.setState({
          username: user.username,
          type: user.type,
          accessLevel: user.accessLevel,
          isLoggedIn: false,
          data: JSON.parse(localStorage.getItem('events')),
          filtered: JSON.parse(localStorage.getItem('events'))
        });
      }.bind(this));
      // console.log(localStorage.getItem('events'));
    } else {
      var user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
      // console.log(JSON.parse(localStorage.getItem('events')));
      socket.emit('loadEvents', { userAC: user.accessLevel, limit: 50 });
      socket.on('loadEventsRepsonse', function (data) {
        // console.log("Gather appropriate events");
        localStorage.setItem("events", JSON.stringify(data));
        // console.log(data);
        this.setState({
          username: user.username,
          userID: user.userID,
          accessLevel : user.accessLevel,
          type: user.type,
          isLoggedIn: true,
          data: JSON.parse(localStorage.getItem('events')),
          filtered: JSON.parse(localStorage.getItem('events')),

        });
      }.bind(this));
    }
  }
  removeEvent(value) {

    console.log("Event id?" + value.EventID);
    socket.emit('deleteEvent', value.EventID);
    var removeIndex = this.state.data.map(function (item) { return item.id; }).indexOf(value.id);

    this.state.data.splice(removeIndex, 1);
    localStorage.setItem('events', JSON.stringify(this.state.data));

    // console.log(this.state.data)

    this.setState({
      filtered: JSON.parse(localStorage.getItem('events'))
    })


  }
  addEvent(value) {
    console.log('VALUE:');
    console.log(value.EventID);
    var userID = JSON.parse(localStorage.getItem('user')).userID;
    socket.emit('addToFavorites' ,{UserID: userID, EventID: value.EventID});

    var obj = localStorage.getItem('myevents');
    // console.log('OBJ:');
  console.log(obj);
    var c, found = false;
    var id = 'EventID';
    found=obj.includes(value.EventID);
    if (!found) {
      var existing = JSON.parse(localStorage.getItem('myevents'));

      existing.push(value);

      localStorage.setItem('myevents', JSON.stringify(existing));

      found = false;
      this.setState({
        added: true,
      })
    } else {
      window.alert("ALREADY IN MY EVENTS");
    }


  }
  openModal(value) {
    console.log(value.Description);

    this.setState({
       open: true ,
        description:value.Description
      })
  }
  closeModal() {
    this.setState({ open: false })
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }


  search(value) {
    console.log(this.state.data);
    var updatedList = this.state.data;
    updatedList = updatedList.filter(function (item) {
      return item.Title.toLowerCase().search(
        value.toLowerCase()) !== -1;
    });

    this.setState({ filtered: updatedList });
  }

  render() {
    console.log(this.state.filtered);
    const isLoggedIn = this.state.isLoggedIn;
    const { selectedOption } = this.state;
    // console.log(this.state.type);
    return (
      <div className="events-container">
        <div className="sidebar">
          <Sidebar className="sidebar" />
        </div>
        <section className="right">
          <section className="right-top">
            <div className="searchBar">
              <SearchField
                placeholder="Search..."
                onChange={this.search}
                onEnter={this.search}
                onSearchClick={this.search}
                searchText=""
                classNames="test-class"
              />
            </div>
          </section>

          <div className="events-title">All Events</div>
            <PerfectScrollbar className="scroll-container">
              <ListGroup>
                {this.state.filtered.map((value,i) =>

                  <div className="list" key={value.id}>
                    <ListGroupItem className="item" >
                      <ListGroupItemHeading>{value.Title} </ListGroupItemHeading>
                      <ListGroupItemText>
                        <div className="event-date-location">
                          <ul><label> Date </label> {value.DateTime}</ul>
                          <ul><label> Location </label> {value.Location}</ul>
                        </div>
                        <div className="event-text">
                          {value.Description}
                        </div>
                        {(isLoggedIn) ?
                          <div className="events-but">
                            {(this.state.type == "Admin") ?
                              <div>
                                <button onClick={() => this.removeEvent(value)}> Remove Event </button>
                                <button onClick={()=>this.openModal(value)}> Details </button>
                                <button onClick={() => this.addEvent(value)}>  Add to My Events </button>
                              </div>
                              :
                              <div>
                                <button onClick={()=>this.openModal(value)}> Details </button>
                                <button onClick={() => this.addEvent(value)}>  Add to My Events </button>
                              </div>}
                          </div>
                          :
                          <div className="events-but">
                            <button onClick={()=>this.openModal(value)}> Details </button>
                          </div>
                        }
                        <Popup
                          open={this.state.open}
                          closeOnDocumentClick
                          className="pop"
                          onClose={this.closeModal}

                        >

                        <div>
                        {this.state.description}
</div>

                        </Popup>
                      </ListGroupItemText>
                    </ListGroupItem>

                    </div>

                  )}
            </ListGroup>
          </PerfectScrollbar>
        </section>
      </div>
    );
  }
}

export default Events;
