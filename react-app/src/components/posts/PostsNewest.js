import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/post';
// import PostHeader from './PostHeader';
import PostsList from './PostsList';
import './PostsList.css';

function PostsNewest() {
  const dispatch = useDispatch();
  
  const posts = useSelector(state => state.posts.obj);
  const postIds = Object.keys(posts).reverse();
  const [loaded, setLoaded] = useState(!!postIds.length);

  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch('/api/posts/');
    //   const responseData = await response.json();
    //   setPosts(responseData.posts);
    // }
    // fetchData();
    dispatch(getAllPosts());
    setLoaded(true);
  }, [dispatch]);

  // const postComponents = postIds.map(i => {
  //   const post = posts[i];
  //   return (<PostHeader key={i} post={post} i={i} />);
  // });

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

export default PostsNewest;
