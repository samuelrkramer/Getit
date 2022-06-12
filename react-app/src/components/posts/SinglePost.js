import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function SinglePost() {
  const [post, setPost] = useState({});
  const { postId }  = useParams();
  const user = useSelector(state => state.session.user)

  console.log("In SinglePost component, postId:", postId)

  useEffect(() => {
    if (!postId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const post = await response.json();
      setPost(post);
    })();
  }, [postId]);

  if (!post) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>Post Id</strong> {postId}
      </li>
      <li>
        <strong>User Id</strong> {post.userId}
      </li>
      <li>
        <strong>Title</strong> {post.title}
      </li>
      {post.body && (
        <li>
          <strong>Body</strong> {post.body}
        </li>
      )}
      {post.userId === user.id && (
        <Link to={`/posts/${post.id}/edit`} >Edit</Link>
      )}
    </ul>
  );
}
export default SinglePost;
