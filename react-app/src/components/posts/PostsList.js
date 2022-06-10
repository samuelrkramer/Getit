import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts/');
      const responseData = await response.json();
      setPosts(responseData.posts);
    }
    fetchData();
  }, []);

  const postComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
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
