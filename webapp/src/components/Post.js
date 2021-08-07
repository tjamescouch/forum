import React from 'react';
import { withRouter } from "react-router";
import PostAPI from '../api/PostAPI';
import { Image, Item, Message } from 'semantic-ui-react'
import PostItem from './PostItem';


class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {post: null,
                  error: false};
  }

  async componentDidMount() {
    try {
      let post = await PostAPI.getPost(this.props.match.params.id);
      this.setState({post});
    } catch(error) {
      this.setState({error: true})
    }
  }

  render() {
    return (
      <div>
        {this.state.error &&
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>An error occurred</p>
          </Message>
        }
        {this.state.post &&
          <div>
            <h1>{this.state.post.title}</h1>
            <p>{this.state.post.body}</p>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Post);
