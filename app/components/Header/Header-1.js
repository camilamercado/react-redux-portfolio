import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route // for later
} from 'react-router-dom';

function Home() {
  return (
    <h1>
      HOME
    </h1>
  );
}

function Topics() {
  return (
    <h1>
      TOPICS
    </h1>
  );
}

class Header extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Router>
        <div style={{width: 1000, background: 'blue', margin: '0 auto'}}>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>
          <Route exact path='/home' component={Home} />
          <Route path='/topics' component={Topics} />
        </div>
      </Router>
    );
  }
}

export default Header;
