import React, {useState, useEffect} from 'react';
import PostAPI from '../api/PostAPI';
import { Image, Item, Button, Modal, Input, TextArea, Form, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import PostItem from './PostItem'
import './Posts.css'

const GET_POSTS = gql`
  query {
    getAllPosts {
      _id
      title
      body
      author {
        name
        avatar
      }
    }
  }
`;

function Posts ({isAuthenticated}) {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  const [creatingPost, setCreatingPost] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [post, setPost] = useState({title: '', body: ''});


  function onClickPost() {
    setShowPostModal(true);
  }

  function onClickCancelPost() {
    setShowPostModal(false);
    setPost({title: '', body: ''});
  }

  function onInputChange(event) {
    const target = event.target;
    let value = target.value;
    let name = target.name;
    setPost(prevPost => ({...prevPost, [name]: value}));
  }

  async function onClickCreatePost() {
    setCreatingPost(true);
    try {
      await PostAPI.createPost({title: post.title, body:post.body});
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
    setShowPostModal(false);
    setCreatingPost(false);
    setPost({title: '', body: ''});
    refetch();
  }

  function onSubmitPost() {
    onClickCreatePost();
    return false;
  }



  return (
    <div className='Posts'>
      {isAuthenticated &&
        <button className="Posts-post-button" onClick={onClickPost}>Post</button>
      }

      <div className="Posts-group">
        {data && data.getAllPosts.map(post =>
          <PostItem key={post._id} post={post} />
        )}
      </div>


      <Modal open={showPostModal} onClose={onClickCancelPost}>
        <Modal.Header>Create a Post</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmitPost} autoComplete="off">
            <Form.Input name="title" label='Title' placeholder='Enter a title' value={post.title} onChange={onInputChange} />
            <Form.TextArea name="body" label='Question' placeholder='Write a question' value={post.body} onChange={onInputChange} />
          </Form>
        </Modal.Content>
        {creatingPost ?
          <Loader active />
          :
          <Modal.Actions>
            <Button color='black' onClick={onClickCancelPost}>
              Cancel
            </Button>
            <Button
              content="Create"
              labelPosition='right'
              icon='checkmark'
              onClick={onClickCreatePost}
              disabled={!post.title || !post.body}
              positive
            />
          </Modal.Actions>
        }
        </Modal>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
    return {...state.authentication};
}

export default connect(mapStateToProps)(Posts);
