import React from 'react';
import PostAPI from '../api/PostAPI';
import { Image, Item } from 'semantic-ui-react'
import PostItem from './PostItem'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {};
  }


  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default App;
