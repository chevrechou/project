import React, { Component } from 'react';
import Sidebar from './Sidebar';

import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import "../styles/events.css";
import ScrollArea from 'react-scrollbar';
import SearchInput, {createFilter} from 'react-search-input';
import emails from './mails';
import Popup from 'reactjs-popup'
import SearchField from "react-search-field";


class Events extends Component {
  constructor(props){
    super(props);
    console.log("HERE");
    this.onChange=this.onChange.bind(this);
    this.onEnter=this.onEnter.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this)
    this.state={
      username:"",
      type:"",
      isLoggedIn:false,
      searchTerm: "",
      open: false
     }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }






  componentDidMount () {
      console.log("comp did mount " + this.props.location.isLoggedIn);
       this.setState({
        username:this.props.username,
        type:this.props.type,
        isLoggedIn:this.props.location.isLoggedIn

       });

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
    console.log("user is logged in: " + this.state.isLoggedIn);


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


        <div className="list">

        <ScrollArea horizontal={false} className="area" >

          <ListGroup>
          {/*for (int i=0; i< events.size(); i++)
            events[i].name
            events[i].date
            events[i].description
            */}
          <ListGroupItem >
          <ListGroupItemHeading>Event Name</ListGroupItemHeading>
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
        <ListGroupItem >
  <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
  <ListGroupItemText>
  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
  </ListGroupItemText>
</ListGroupItem>
<ListGroupItem >
<ListGroupItemHeading>List group item heading</ListGroupItemHeading>
<ListGroupItemText>
Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
</ListGroupItemText>
</ListGroupItem>
<ListGroupItem >
<ListGroupItemHeading>List group item heading</ListGroupItemHeading>
<ListGroupItemText>
Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
</ListGroupItemText>
</ListGroupItem>
<ListGroupItem >
<ListGroupItemHeading>List group item heading</ListGroupItemHeading>
<ListGroupItemText>
Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
</ListGroupItemText>
</ListGroupItem>
<ListGroupItem >
<ListGroupItemHeading>List group item heading</ListGroupItemHeading>
<ListGroupItemText>
Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
</ListGroupItemText>
</ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem >
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
          <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>

      </ScrollArea>
  </div>
  </section>
      </div>
    );
  }
}

export default Events;
