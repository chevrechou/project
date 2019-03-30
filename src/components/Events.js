import React, { Component } from 'react';
import Sidebar from './Sidebar';
import SearchField from "react-search-field";
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class Events extends Component {
  constructor(props){
    super(props);
    console.log("HERE");
    this.onChange=this.onChange.bind(this);
    this.onEnter=this.onEnter.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
  }
  onChange(value){
  //  console.log(value);
  }
  onEnter(value){
    console.log(value);
  }
  onSearchClick(value){
      console.log(value);
  }
  render() {
    const data = [
      {
        name: 'Tanner Linsley',
        date: 26,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        }
      },
      {
        name: 'Michael Chang',
        date: 96,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        }
      }
    ]

  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Date',
    accessor: 'date',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]


    return (
      <div className="">
        <div>
          <Sidebar/>
        </div>
        <div>
          <SearchField
            placeholder="Search..."
            onChange={this.onChange}
            onEnter={this.onEnter}
            onSearchClick={this.onSearchClick}
            classNames="test-class"
          />
        </div>
        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default Events;
