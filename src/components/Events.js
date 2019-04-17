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
import { Socket } from 'net';
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'tag', label: 'Tag' },
  { value: 'vanilla', label: 'Vanilla' }
];

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
      selectedOption: "Newest",
      data: [],
      // filtered:data,
      filtered: [],
      added: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search = this.search.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }


  componentDidMount() {

    if (this.props.location.isLoggedIn === false) {
      console.log(JSON.parse(localStorage.getItem('events')));
      console.log('GUEST USER');
      var user = {
        username: "Guest",
        userID: 0,
        accessLevel: 0,
        type: 'guest',
        isGuest: "true",
        isLoggedIn: "false",
      }
      console.log("USER ACLEVL" + user.accessLevel);
      socket.emit('loadEvents', { userAC: user.accessLevel, limit: 50 });
      socket.on('loadEventsRepsonse', function (data) {
        console.log("Gather appropriate events");
        localStorage.setItem("events", JSON.stringify(data));
        console.log(data);
        this.setState({
          username: user.username,
          type: user.type,
          accessLevel: user.accessLevel,
          isLoggedIn: false,
          data: JSON.parse(localStorage.getItem('events')),
          filtered: JSON.parse(localStorage.getItem('events'))
        });
      }.bind(this));
      console.log(localStorage.getItem('events'));
    } else {
      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      console.log(JSON.parse(localStorage.getItem('events')));
      socket.emit('loadEvents', { userAC: user.accessLevel, limit: 50 });
      socket.on('loadEventsRepsonse', function (data) {
        console.log("Gather appropriate events");
        localStorage.setItem("events", JSON.stringify(data));
        console.log(data);
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

    // remove object
    this.state.data.splice(removeIndex, 1);

    // this.state.data.filter(item => item !== obj[c])

    localStorage.setItem('events', JSON.stringify(this.state.data));

    console.log(this.state.data)

    this.setState({
      filtered: JSON.parse(localStorage.getItem('events'))
    })


  }
  addEvent(value) {
    console.log('VALUE:');
    console.log(value.EventID);
    var userID = JSON.parse(localStorage.getItem('user')).userID;
    socket.emit('addToFavorites' ,{UserID: userID, EventID: value.EventID});
    var found = false;
    var obj = localStorage.getItem('myevents');
    console.log('OBJ:');
    console.log(obj);
    var c, found = false;
    var id = 'EventID';
    for (c in obj) {
      if (obj[c][id] == value.EventID) {
        found = true;
        break;
      }
    }
    if (!found) {
      var existing = JSON.parse(localStorage.getItem('myevents'));

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      // existing = existing ? JSON.parse(existing) : {};

      // Add new data to localStorage Array
      existing.push(value);

      // Save back to localStorage
      localStorage.setItem('myevents', JSON.stringify(existing));



      // obj.push(value);
      found = false;
      this.setState({
        added: true,
      })
    } else {
      console.log("ALREADY IN MY EVENTS")
    }


  }
  openModal(value) {
    console.log(value.Description);
    this.setState({ open: true })
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
      return item.Name.toLowerCase().search(
        value.toLowerCase()) !== -1;
    });

    this.setState({ filtered: updatedList });
  }

  render() {
    console.log(this.state.filtered);


    const isLoggedIn = this.state.isLoggedIn;


    const { selectedOption } = this.state;
    console.log(this.state.type);
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
            {/*<div className="select-bar">
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>*/}
          </section>

          <div className="events-title">All Events</div>
          <PerfectScrollbar className="scroll-container">
            {
              this.state.filtered.map((value) =>

                <div className="list" key={value.id}>

                  <ListGroup>

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
                          <div >

                            {value.Description}
                          </div>
                        </Popup>
                      </ListGroupItemText>
                    </ListGroupItem>




                  </ListGroup>

                </div>)}
          </PerfectScrollbar>
        </section>
      </div>
    );
  }
}

export default Events;
