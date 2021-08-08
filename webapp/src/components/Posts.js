import React from 'react';
import PostAPI from '../api/PostAPI';
import { Image, Item, Button, Modal, Input, TextArea, Form, Loader } from 'semantic-ui-react'
import PostItem from './PostItem'
import './Posts.css'

class Posts extends React.Component {

  constructor(props) {
    super(props)
    this.state = {posts:[],
                  showPostModal:false,
                  creatingPost: false,
                  title: '',
                  body: ''};

    this.onClickPost = this.onClickPost.bind(this);
    this.onClickCancelPost = this.onClickCancelPost.bind(this);
    this.onClickCreatePost = this.onClickCreatePost.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    try {
      let posts = await PostAPI.getPosts();
      this.setState({posts})
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  }

  onClickPost() {
    this.setState({showPostModal:true});
  }

  onClickCancelPost() {
    this.setState({showPostModal:false, title: '', body: ''});
  }

  async onClickCreatePost() {
    this.setState({creatingPost:true});
    try {
      await PostAPI.createPost({title: this.state.title, body:this.state.body});
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
    this.setState({showPostModal:false, creatingPost: false, title: '', body: ''});
    this.loadData();
  }

  onSubmitPost() {
    this.onClickCreatePost();
    return false;
  }

  onInputChange(event) {
    const target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='Posts'>
        <Button size='huge' onClick={this.onClickPost}>Post</Button>
        <Item.Group>
          {this.state.posts.map(post =>
            <PostItem key={post._id} post={post} />
          )}
        </Item.Group>


        <Modal open={this.state.showPostModal} onClose={this.onClickCancelPost}>
          <Modal.Header>Create a Post</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmitPost}>
              <Form.Input name="title" label='Title' placeholder='Enter a title' value={this.state.title} onChange={this.onInputChange} />
              <Form.TextArea name="body" label='Question' placeholder='Write a question' value={this.state.body} onChange={this.onInputChange} />
            </Form>
          </Modal.Content>
          {this.state.creatingPost ?
            <Loader active />
            :
            <Modal.Actions>
              <Button color='black' onClick={this.onClickCancelPost}>
                Cancel
              </Button>
              <Button
                content="Create"
                labelPosition='right'
                icon='checkmark'
                onClick={this.onClickCreatePost}
                positive
              />
            </Modal.Actions>
          }
          </Modal>
      </div>
    );
  }
}

export default Posts;
