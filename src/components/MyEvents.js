import React, { Component } from 'react';
import Sidebar from './Sidebar';

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import "../styles/events.css";
import ScrollArea from 'react-scrollbar';
import SearchInput, {createFilter} from 'react-search-input';
import Select from 'react-select';
import Popup from 'reactjs-popup';
import SearchField from "react-search-field";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import data from "../myevents.json";

const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'tag', label: 'Tag' },
  { value: 'vanilla', label: 'Vanilla' }
];
class MyEvents extends Component {
  constructor(props){
    super(props);
    console.log("HERE");

    this.searchUpdated = this.searchUpdated.bind(this)
    this.state={
      username:"testname",
      userID:"123",
      type:"guest",
      isLoggedIn:true,
      searchTerm: "",
      open: false,
      selectedOption: null,
      data,
      myEvents:data,
     }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search=this.search.bind(this);
    this.removeEvent=this.removeEvent.bind(this);
  }

  componentDidMount () {
      console.log("myEVENTS " + this.props.location.isLoggedIn);
       this.setState({
        username:this.props.location.state.username,
        userID:this.props.location.state.userID,
        type:this.props.type,
        // isLoggedIn:this.props.location.isLoggedIn,
         selectedOption: null,
       });

   }
   removeEvent(value){
     var c, found=false;
     var id='id';
     var obj = this.state.myEvents;
     for(c in obj) {
        if(obj[c][id] == value.id) {
            found=true;
            break;
        }
    }
    if(found){
          console.log(obj[c])
        delete obj[c];
    }
    console.log(obj)

    this.setState({
      myEvents:obj
    })
   }
   search(value){
     console.log(data);
     var updatedList = data;
     updatedList = updatedList.filter(function(item){
       return item.Name.toLowerCase().search(
       value.toLowerCase()) !== -1;
     });
     this.setState({myEvents: updatedList});
   }
   handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
   openModal (){
     console.log("opening modal");
     this.setState({ open: true })
   }
   closeModal () {
     this.setState({ open: false })
   }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    console.log(this.state.isLoggedIn);
const { selectedOption } = this.state;

  const isLoggedIn=this.state.isLoggedIn;
  var isNotEmpty=false;
  for (var i=0; i<this.state.myEvents.length; i++) {
  if (this.state.myEvents[i] != null) {
    isNotEmpty = true;
    break;
  }
}

console.log(this.state.myEvents.length)
  return (

    <div className="events-container">
      <div className="sidebar">
        <Sidebar className="sidebar"/>
      </div>

      <section className="right">
      {
        (isNotEmpty)?
        <div>
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
          <div className="select-bar">
          <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          />
          </div>
        </section>


      <PerfectScrollbar>
        {
          this.state.myEvents.map((value) =>
          <div>
            <div className="list">

        <ListGroup>

        <ListGroupItem >
          <ListGroupItemHeading>{value.Name} </ListGroupItemHeading>
          <ListGroupItemText>
            <div className="event-text">
            {value.Description}
            </div>
            {(isLoggedIn)?
                <div className="events-but">
                  <button  onClick={this.openModal}> Details </button> <button onClick={() => this.removeEvent(value)}>Remove from my Events </button>
                </div>
                :
                <div className="events-but">
                  <button  onClick={this.openModal}> Details </button>
                </div>
            }
            <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
            >
              <div className= "event-details">
              {value.Description}

                </div>
            </Popup>
          </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>

    </div>
  </div>)}
  </PerfectScrollbar>
  </div>:<div> Empty </div>}
    </section>
    </div>

  );
  }
}

export default MyEvents;
