import React, { Component } from 'react';

import Test from './Test';
import Login from './Login';
import Welcome from './Welcome';
class Home extends Component {
  render() {
    return (


        <div className="login-cts">
          Login<br/>
          <Login/>
        </div>

    );
  }
}

export default Home;
