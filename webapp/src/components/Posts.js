import React from 'react';
import PostAPI from '../api/PostAPI';
import { Image, Item } from 'semantic-ui-react'
import PostItem from './PostItem'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {posts:[]};
  }

  componentDidMount() {
    PostAPI.getPosts()
      .then(posts => this.setState({posts: posts}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <div className="body-content">
            <Item.Group>
              {this.state.posts.map(post =>
                <PostItem post={post} />
              )}
            </Item.Group>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
