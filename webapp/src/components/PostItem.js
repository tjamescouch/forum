import React from 'react';
import { Image, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function PostItem({post}) {
  return (
    <Link className="Posts-forum-post" to={`/post/${post._id}`}>
      <img src='/default-avatar.jpeg' />

      <div>
        <h3>{post.title}</h3>
        <p>
          {post.body}
        </p>
      </div>
    </Link>
  );
}

export default PostItem;
