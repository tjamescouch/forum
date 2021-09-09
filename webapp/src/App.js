import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import logo from './logo.svg';
import PostAPI from './api/PostAPI';
import AppContent from './components/AppContent.js';
import {connect} from 'react-redux';
import {setAuthenticated} from './actions';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {posts:[]};
  }

  componentDidMount() {
    let isAuthenticated = Boolean(localStorage.jwtToken);
    this.props.setAuthenticated(isAuthenticated);
  }

  render() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  }
}

export default connect(null, {setAuthenticated})(App);
