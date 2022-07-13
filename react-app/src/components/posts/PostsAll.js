import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
import PostsList from './PostsList';
import './PostsList.css';

function PostsAll() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const posts = useSelector(state => state.posts.obj);
  const postIds = Object.keys(posts);

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
