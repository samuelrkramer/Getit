import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import PostsList from './PostsList';
import './PostsList.css';

function PostsAll() {
  const dispatch = useDispatch();
  
  const posts = useSelector(state => state.posts.obj);
  const postIds = Object.keys(posts);
  const [loaded, setLoaded] = useState(!!postIds.length);

  useEffect(() => {
    dispatch(getAllPosts());
    setLoaded(true);
  }, [dispatch]);

  return (
    <>
      {!loaded && (
        <h2>Loading...</h2>
      )}
      {loaded && (
        <PostsList posts={posts} postIds={postIds} />
      )}
    </>
  );
}

export default PostsAll;
