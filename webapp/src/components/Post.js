import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { getUploadUrl } from '../api/APIUtils';
import PostAPI from '../api/PostAPI';
import CommentAPI from '../api/CommentAPI';
import { Image, Item, Message } from 'semantic-ui-react'
import PostItem from './PostItem';
import './Post.css';

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {post: null,
                  error: false,
                  comments: [],
                  comment: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickAddComment = this.onClickAddComment.bind(this);
  }


  onInputChange(event) {
    const target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({[name]: value});
  }

  isValid() {
    return this.state.post && this.state.comment;
  }

  async onClickAddComment(event) {
    if(!this.isValid()) {
      return;
    }
    this.setState({creatingComment:true});
    try {
      await CommentAPI.createComment(this.state.post._id, {text: this.state.comment, postId:this.state.post._id});
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
    this.setState({creatingComment: false, comment: ''});
    this.loadComments();
  }

  async componentDidMount() {
    this.loadPost();
    this.loadComments();
  }

  async loadComments() {
    try {
      let comments = await CommentAPI.getComments(this.props.match.params.id);
      this.setState({comments});
    } catch(error) {
      this.setState({error: true})
    }
  }

  async loadPost() {
    try {
      let post = await PostAPI.getPost(this.props.match.params.id);
      this.setState({post});
    } catch(error) {
      this.setState({error: true})
    }
  }

  render() {
    return (
      <div className="Post">
        {this.state.error &&
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>An error occurred</p>
          </Message>
        }
        {this.state.post &&
          <div>
            <div className="Post-avatar-wrapper">
              {this.state.post && this.state.post.author && this.state.post.author.avatar ?
                <img src={getUploadUrl(this.state.post.author.avatar)} />
                :
                <img src='/default-avatar.jpeg' />
              }
              <p className="Post-avatar-name" >{this.state.post.author && this.state.post.author.name}</p>
            </div>
            <section>
            <h1>{this.state.post.title}</h1>
            <p>{this.state.post.body}</p>
            </section>
            <section>
              <h3>Comments</h3>
              {this.state.comments.map(comment =>
                <div className="Post-comment-wrapper" key={comment._id}>
                  <div className="Post-comment-avatar-wrapper">
                    {comment.author && comment.author.avatar ?
                      <img src={getUploadUrl(comment.author.avatar)} />
                      :
                      <img src='/default-avatar.jpeg' />
                    }
                    <p className="Post-comment-avatar-name" >{comment.author && comment.author.name}</p>
                  </div>
                  <p>{comment.text}</p>
                </div>
              )}
              {this.props.isAuthenticated &&
                <>
                  <textarea className="Post-comment-textarea" name="comment" value={this.state.comment} onChange={this.onInputChange} />
                  <div className="Post-comment-button-wrapper">
                    <button disabled={this.state.creatingComment} className="Post-comment-button" onClick={this.onClickAddComment}>Add Comment</button>
                  </div>
                </>
              }
            </section>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {...state.authentication};
}

export default withRouter(connect(mapStateToProps)(Post));
