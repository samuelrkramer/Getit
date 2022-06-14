import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAllPosts } from '../../store/post';

function PostsList() {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);

  const posts = useSelector(state => state.posts.obj);
  const postIds = Object.keys(posts);

  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch('/api/posts/');
    //   const responseData = await response.json();
    //   setPosts(responseData.posts);
    // }
    // fetchData();
    dispatch(getAllPosts());
  }, [dispatch]);

  const postComponents = postIds.map(i => {
    const post = posts[i];
    return (
      <li key={i}>
        <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink> from <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
      </li>
    );
  });

  return (
    <>
      <h1>Post List: </h1>
      <ul>{postComponents}</ul>
    </>
  );
}

export default PostsList;
