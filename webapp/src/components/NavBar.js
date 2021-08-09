import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

class NavBar extends React.Component {


  render() {
    return (
      <header>
        <ul className="NavBar">
          <li><Link className="NavBar-link home" to="/">Home</Link></li>
          <li><Link className="NavBar-link" to="/login">Sign In</Link></li>
          <li><Link className="NavBar-link" to="/signup">Get Started</Link></li>
        </ul>
      </header>
    );
  }
}

export default NavBar;
