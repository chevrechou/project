import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EditEventForm from './EditEventForm';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import "../styles/events.css";
import ScrollArea from 'react-scrollbar';
import SearchInput, { createFilter } from 'react-search-input';
import Select from 'react-select';
import Popup from 'reactjs-popup';
import SearchField from "react-search-field";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import data from "../myevents.json";
import io from 'socket.io-client';
<script src="http://localhost:2900/socket.io/socket.io.js"></script>
var socket = io.connect('http://localhost:2900');
const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'tag', label: 'Tag' },
  { value: 'vanilla', label: 'Vanilla' }
];
class MyEvents extends Component {
  constructor(props) {
    super(props);
    console.log("HERE");

    this.searchUpdated = this.searchUpdated.bind(this)
    this.state = {
      username: "testname",
      userID: "123",
      type: "not guest",
      isLoggedIn: true,
      searchTerm: "",
      open: false,
      selectedOption: null,
      data: [],
      // filtered:data,
      filtered: [],
      myEvents: [],
      edit: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.edit = this.edit.bind(this);
    this.doneedit = this.doneedit.bind(this);
    this.search = this.search.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }

  componentDidMount() {

    var user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.parse(localStorage.getItem('events')));
    this.setState({
      username: user.username,
      type: user.type,
      // isLoggedIn:this.props.location.isLoggedIn,
      selectedOption: null,
      data: JSON.parse(localStorage.getItem('myevents')),
      myEvents: JSON.parse(localStorage.getItem('myevents')),
      // filtered:data,
      filtered: JSON.parse(localStorage.getItem('myevents')),
    });

  }
  removeEvent(value) {
    var userID = JSON.parse(localStorage.getItem('user')).userID;
    socket.emit('removeFromFavorites' ,{UserID: userID, EventID: value.EventID});
    var c, found = false;
    var id = 'EventID';
    var i = 0;
    var obj = this.state.data;
    for (c in obj) {
      if (obj[c][id] == value.EventID) {
        found = true;
        console.log(obj[c])
        break;
      }
    }
    if (found) {
      console.log(obj[c])
      var existing = localStorage.getItem('myevents');

      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ? JSON.parse(existing) : {};
      console.log('what is data?')
      console.log(this.state.data);
      // Add new data to localStorage Array
      // existing.remove(value);
      var removeIndex = this.state.data.map(function (item) { return item.EventID; }).indexOf(value.EventID);

      // remove object
      this.state.data.splice(removeIndex, 1);

      // this.state.data.filter(item => item !== obj[c])
      console.log(this.state.data)
      localStorage.setItem('myevents', JSON.stringify(this.state.data));
      found = false;
    }
    console.log(obj)

    this.setState({
      myEvents: JSON.parse(localStorage.getItem('myevents'))
    })
  }
  editEvent = (value) => {
    console.log("edit")


  }
  search(value) {
    //  console.log(data);
    //  var updatedList = data;
    var updatedList = updatedList.filter(function (item) {
      return item.Name.toLowerCase().search(
        value.toLowerCase()) !== -1;
    });
    this.setState({ myEvents: updatedList });
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  edit() {
    this.setState({
      edit: true
    })
  }
  doneedit() {
    this.setState({
      edit: false
    })
  }
  openModal() {
    console.log("opening modal");
    this.setState({ open: true })
  }
  closeModal() {
    this.setState({ open: false })
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    console.log(this.state.isLoggedIn);
    const { selectedOption } = this.state;

    const isLoggedIn = this.state.isLoggedIn;
    var isNotEmpty = false;
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i] != null) {
        isNotEmpty = true;
        break;
      }
    }

    console.log(this.state.myEvents.length)
    return (

      <div className="events-container">
        <div className="sidebar">
          <Sidebar className="sidebar" />
        </div>


        {
          (isNotEmpty) ?
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

              <div className="events-title">My Events</div>
              <PerfectScrollbar className="scroll-container">
                {
                  this.state.myEvents.map((value) =>

                    <div className="list">
                      <ListGroup>
                        <ListGroupItem >
                          <ListGroupItemHeading>{value.Title} </ListGroupItemHeading>
                          <ListGroupItemText>
                            <div className="event-date-location">
                              <ul><label> Date </label> {value.DateTime}</ul>
                              <ul><label> Location </label> {value.Location}</ul>
                            </div>
                            <div className="event-text">{value.Description}</div>
                            {
                              (value.Created === "true" || this.state.type==="Admin") ?
                                <div className="events-but">
                                  <button onClick={this.edit}>Edit </button>
                                  <button onClick={this.openModal}> Details </button>
                                  <button onClick={() => this.removeEvent(value)}>Remove from my Events </button>
                                  <Popup
                                    open={this.state.edit}
                                    closeOnDocumentClick
                                    onClose={this.doneedit}
                                  >

                                    <EditEventForm props={value} />
                                  </Popup>
                                </div>
                                :
                                <div className="events-but"><button onClick={this.openModal}> Details </button><button onClick={() => this.removeEvent(value)}>Remove from my Events </button></div>
                            }
                            <Popup
                              open={this.state.open}
                              closeOnDocumentClick
                              onClose={this.closeModal}
                            >
                              <div className="event-details">{value.Description}</div>
                            </Popup>
                          </ListGroupItemText>
                        </ListGroupItem>
                      </ListGroup>

                    </div>)}
              </PerfectScrollbar>
            </section>
            : <div className="empty-myevents"> <h3> No events to show. </h3> </div>
        }
      </div>

    );
  }
}

export default MyEvents;
