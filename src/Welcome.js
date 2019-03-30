import React, { Component } from 'react';


class Welcome extends Component {
  render() {
    return (
      <div className="">
        <div className="intro">
          Welcome

          <a href="/home">Sign In</a>
          <a href="/home"> Register </a>
          <a href="/events"> Continue as Guest  </a>
      </div>

      </div>
    );
  }
}

export default Welcome;
