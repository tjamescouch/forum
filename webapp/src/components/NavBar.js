import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import { connect } from 'react-redux';
import { signOut } from '../actions';

function NavBar({isAuthenticated, signOut}) {

  function onSignOut() {
    delete localStorage.jwtToken;
    signOut(false);
  }

  return (
    <header className="NavBar">
      <ul className="NavBar-ul">
        <li><Link className="NavBar-link home" to="/">Home</Link></li>
        {!isAuthenticated &&
          <>
          <li><Link className="NavBar-link" to="/login">Sign In</Link></li>
          <li><Link className="NavBar-link" to="/signup">Get Started</Link></li>
          </>
        }
        {isAuthenticated &&
          <>
          <li><Link className="NavBar-link" to="/profile">Profile</Link></li>
          <li><Link className="NavBar-link" to="/" onClick={onSignOut}>Sign Out</Link></li>
          </>
        }
      </ul>
    </header>
  );
}

function mapStateToProps(state, ownProps) {
    return {...state.authentication};
}

export default connect(mapStateToProps, {signOut})(NavBar);
