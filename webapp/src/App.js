import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostAPI from './api/PostAPI';
import { Image, Item } from 'semantic-ui-react'

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
                <Item className="App-forum-post">
                  <Item.Image size='tiny' src='/logo192.png' />

                  <Item.Content>
                    <Item.Header as='a'>{post.title}</Item.Header>
                    <Item.Description>
                      {post.body}
                    </Item.Description>
                  </Item.Content>
                </Item>
              )}
            </Item.Group>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
