import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import { connect } from 'react-redux';
import { signOut } from '../actions';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    delete localStorage.jwtToken;
    this.props.signOut(false);

  }

  render() {
    return (
      <header>
        <ul className="NavBar">
          <li><Link className="NavBar-link home" to="/">Home</Link></li>
          {!this.props.isAuthenticated &&
            <li><Link className="NavBar-link" to="/login">Sign In</Link></li>
          }
          {!this.props.isAuthenticated &&
            <li><Link className="NavBar-link" to="/signup">Get Started</Link></li>
          }
          {this.props.isAuthenticated &&
            <li><Link className="NavBar-link" to="/" onClick={this.onSignOut}>Sign Out</Link></li>
          }
        </ul>
      </header>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {...state.authentication};
}

export default connect(mapStateToProps, {signOut})(NavBar);
