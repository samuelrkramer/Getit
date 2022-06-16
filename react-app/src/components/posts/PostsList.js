import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAllPosts } from '../../store/post';
import './PostsList.css';

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
      <div className="listRow" key={i}>
        <span class="rowIndex">{i}</span>
        <div className="rowItem">
          <p className="title">
            <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
          </p>
          <p className="tagline">
            submitted at {post.created_at} by <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="postList">
      {/* <h1>Post List: </h1> */}
      <ul>{postComponents}</ul>
    </div>
  );
}

export default PostsList;
