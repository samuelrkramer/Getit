import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import PostHeader from './PostHeader';
import PostsList from './PostsList';
import './PostsList.css';

function PostsAll() {
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

  // const postComponents = postIds.map(i => {
  //   const post = posts[i];
  //   return (<PostHeader key={i} post={post} i={i} />);
  // });

  return (
    <PostsList posts={posts} postIds={postIds}/>
  );
}

export default PostsAll;
