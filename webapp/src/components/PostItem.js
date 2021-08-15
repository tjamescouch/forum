import React from 'react';
import { Image, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function PostItem({post}) {
  return (
    <Link className="Posts-forum-post" to={`/post/${post._id}`}>
      <div className="Posts-avatar-wrapper">
        <img src='/default-avatar.jpeg' />
        <p className="Posts-avatar-name" >{post.author && post.author.name}</p>
      </div>

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
