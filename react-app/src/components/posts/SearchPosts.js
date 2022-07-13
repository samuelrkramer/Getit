import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../store/post';
import PostsList from './PostsList';
import './PostsList.css';

function SearchPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  
  const dispatch = useDispatch();
  
  const posts = useSelector(state => state.posts.obj);
  const [postIds, setPostIds] = useState(Object.keys(posts));
  const [loaded, setLoaded] = useState(!!postIds.length);
  

  useEffect(async () => {
    console.log("useEffect fired, query changed?", query)
    // const doSearch = async query => {
      const results = await dispatch(searchPosts(query));
    //   return results;
    // };
    // const results = doSearch(query);
    console.log("after thunk returned:", results)
    setPostIds(results.map(el=>el.id));
    setLoaded(true)
  }, [dispatch, query]);

  console.log("searchPosts rendered, query is:", query)

  return (
    <>
      {!loaded && (
        <h2>Loading...</h2>
      )}
      {loaded && (
        <>
          <h1>Results for "{query}"</h1>
          <h3>{postIds.length || "No"} result{postIds.length===1?null:"s"}</h3>
          <PostsList posts={posts} postIds={postIds} />
        </>
      )}
    </>
  );
}

export default SearchPosts;
