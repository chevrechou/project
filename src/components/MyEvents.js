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
import data from "../test.json";

const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'tag', label: 'Tag' },
  { value: 'vanilla', label: 'Vanilla' }
];
class MyEvents extends Component {
  constructor(props){
    super(props);
    console.log("HERE");
    this.onChange=this.onChange.bind(this);
    this.onEnter=this.onEnter.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this)
    this.state={
      username:"",
      userID:"",
      type:"",
      isLoggedIn:false,
      searchTerm: "",
      open: false,
      selectedOption: null,
      data,
     }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }






  componentDidMount () {
      console.log("myEVENTS " + this.props.location.isLoggedIn);
       this.setState({
        username:this.props.location.state.username,
        userID:this.props.location.state.userID,
        type:this.props.type,
        isLoggedIn:this.props.location.isLoggedIn,
         selectedOption: null,
       });

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
  onChange(value){
   console.log(value);
  }
  onEnter(value){
    console.log(value);
  }
  onSearchClick(value){
      console.log(value);
  }
  render() {
    console.log(this.state);
const { selectedOption } = this.state;

  const isLoggedIn=this.state.isLoggedIn;
  let buttons;
  if (isLoggedIn){
    buttons =
      <div className="events-but">
        <button  onClick={this.openModal}> Details </button> <button> Add to My Events </button>
      </div>
  }else{
    buttons=
      <div className="events-but">
        <button  onClick={this.openModal}> Details </button>
      </div>
  }


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
              onChange={this.onChange}
              onEnter={this.onEnter}
              onSearchClick={this.onSearchClick}
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
          this.state.data.map((value) =>
          <div>
            <div className="list">

        <ListGroup>

        <ListGroupItem >
          <ListGroupItemHeading>{value.Name} </ListGroupItemHeading>
          <ListGroupItemText>
            <div className="event-text">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </div>
            {buttons}
            <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
            >
              <div className= "event-details">
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

export default MyEvents;
