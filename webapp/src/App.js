import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PostAPI from './api/PostAPI';
import AppContent from './components/AppContent.js';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {posts:[]};
  }

  render() {
    return (
      <Router>
        <AppContent />
      </Router>
    );
  }
}

export default App;
