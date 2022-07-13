import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../store/post';
// import PostHeader from './PostHeader';
import PostsList from './PostsList';
import './PostsList.css';

function SearchPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');

  const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);

  const posts = useSelector(state => state.posts.obj);
  const [postIds, setPostIds] = useState([]);
  

  useEffect(() => {
    const doSearch = async query => {
      const results = await dispatch(searchPosts(query));
      return results;
    };
    const results = doSearch(query);
    console.log("after thunk returned:", results)
    setPostIds(results);
  }, [dispatch]);

  return (
    <PostsList posts={posts} postIds={postIds}/>
  );
}

export default SearchPosts;