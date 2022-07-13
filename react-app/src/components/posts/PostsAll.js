import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import PostsList from './PostsList';
import './PostsList.css';

function PostsAll() {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);

  const posts = useSelector(state => state.posts.obj);
  const postIds = Object.keys(posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <PostsList posts={posts} postIds={postIds}/>
  );
}

export default PostsAll;
