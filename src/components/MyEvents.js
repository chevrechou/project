import React, { Component } from 'react';
import Sidebar from './Sidebar';
import EditEventForm from './EditEventForm';
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
      edit:false
     }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.edit = this.edit.bind(this);
    this.doneedit = this.doneedit.bind(this);
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
        delete data[c];
    }
    console.log(obj)

    this.setState({
      myEvents:obj
    })
   }
   editEvent=(value) =>{
     console.log("edit")


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
  edit(){
    this.setState({
      edit:true
    })
  }
  doneedit(){
    this.setState({
      edit:false
    })
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
  for (var i=0; i<this.state.data.length; i++) {
  if (this.state.data[i] != null) {
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


      {
        (isNotEmpty)?
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
            <div className="select-bar">
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            />
            </div>
          </section>

          <div className="events-title">My Events</div>
            <PerfectScrollbar  className="scroll-container">
            {
              this.state.myEvents.map((value) =>

            <div className="list">
              <ListGroup>
                <ListGroupItem >
                  <ListGroupItemHeading>{value.Name} </ListGroupItemHeading>
                  <ListGroupItemText>
                    <div className="event-date-location">
                      <ul><label> Date </label> {value.Date}</ul>
                      <ul><label> Location </label> {value.Date}</ul>
                    </div>
                    <div className="event-text">{value.Description}</div>
                      {
                        (value.Created==="true")?
                        <div className="events-but">
                        <button onClick={this.edit}>Edit </button>
                        <button  onClick={this.openModal}> Details </button>
                        <button onClick={() => this.removeEvent(value)}>Remove from my Events </button>
                        <Popup
                        open={this.state.edit}
                        closeOnDocumentClick
                        onClose={this.doneedit}
                        >

                          <EditEventForm props={value}/>
                        </Popup>
                        </div>
                        :
                        <div className="events-but"><button  onClick={this.openModal}> Details </button><button onClick={() => this.removeEvent(value)}>Remove from my Events </button></div>
                      }
                        <Popup
                        open={this.state.open}
                        closeOnDocumentClick
                        onClose={this.closeModal}
                        >
                          <div className= "event-details">{value.Description}</div>
                        </Popup>
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>

              </div>)}
            </PerfectScrollbar>
          </section>
          :<div className="empty-myevents"> <h3> No events to show. </h3> </div>
        }
    </div>

  );
  }
}

export default MyEvents;
