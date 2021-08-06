import React from 'react';
import { Image, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function PostItem({post}) {
  return (
    <Item className="App-forum-post"  as={Link} to={`/post/${post._id}`}>
      <Item.Image size='tiny' src='/logo192.png' />

      <Item.Content>
        <Item.Header as='a'>{post.title}</Item.Header>
        <Item.Description>
          {post.body}
        </Item.Description>
      </Item.Content>
    </Item>
  );
}

export default PostItem;
