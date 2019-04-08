import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import "../styles/events.css";
import ScrollArea from 'react-scrollbar';
import SearchInput, {createFilter} from 'react-search-input';
import data from "../test.json";
import Popup from 'reactjs-popup'
import SearchField from "react-search-field";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
var jsonData = require('../test.json');
const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'tag', label: 'Tag' },
  { value: 'vanilla', label: 'Vanilla' }
];


class Events extends Component {
  constructor(props){
    super(props);
    console.log("HERE");

    this.searchUpdated = this.searchUpdated.bind(this)
    this.state={
      username:"",
      userID:"",
      type:"",
      isLoggedIn:true,
      searchTerm: "",
      open: false,
      selectedOption: "Newest",
      data,
      filtered:data,
     }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search=this.search.bind(this);
    // this.addEvent=this.addEvent.bind(this);
  }





  handleChange = (selectedOption) => {
   this.setState({ selectedOption });
   console.log(`Option selected:`, selectedOption);
  }
  componentDidMount () {
      console.log("comp did mount " + this.props.location.isLoggedIn);
       this.setState({
        username:this.props.username,
        type:this.props.type,
      //  isLoggedIn:this.props.location.isLoggedIn

       });

   }
   addEvent(value){
     console.log(value.id);
     var found=false;
     var obj = require('../myevents.json');

     var c, found=false;
     var id='id';

     for(c in obj) {
        if(obj[c][id] == value.id) {
            found=true;
            break;
        }
    }
    if (!found){
        obj.push(value);
    }else{
      console.log("ALREADY IN MY EVENTS")
    }


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


  search(value){
    console.log(data);
    var updatedList = data;
    updatedList = updatedList.filter(function(item){
      return item.Name.toLowerCase().search(
      value.toLowerCase()) !== -1;
    });
    this.setState({filtered: updatedList});
  }

  render() {
    console.log("user is logged in: " + this.state.isLoggedIn);


  const isLoggedIn=this.state.isLoggedIn;


  const { selectedOption } = this.state;

    return (
      <div className="events-container">
        <div className="sidebar">
          <Sidebar className="sidebar"/>
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
            <div className="select-bar">
            <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            />
            </div>
          </section>

          <div className="events-title">All Events</div>
        <PerfectScrollbar className="scroll-container">
          {
            this.state.filtered.map((value) =>
            <div>
              <div className="list">

          <ListGroup>

          <ListGroupItem className="item" >
            <ListGroupItemHeading>{value.Name} </ListGroupItemHeading>
            <ListGroupItemText>
              <div className="event-text">
              {value.Description}
              </div>
              { (isLoggedIn)?

                    <div className="events-but">
                      <button  onClick={this.openModal}> Details </button> <button onClick={() => this.addEvent(value)}>  Add to My Events </button>
                    </div>:

                    <div className="events-but">
                      <button  onClick={this.openModal}> Details </button>
                    </div>
                }
              <Popup
              open={this.state.open}
              closeOnDocumentClick
              className="pop"
              onClose={this.closeModal}
              >
                <div >
                {/*  <a className="close" onClick={this.closeModal}>
                  close
                  </a> */}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                  omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                  ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                  doloribus. Odit, aut.
                  </div>
              </Popup>
            </ListGroupItemText>
        </ListGroupItem>




      </ListGroup>



      </div>
    </div>)}
    </PerfectScrollbar>
      </section>
      </div>
    );
  }
}

export default Events;
