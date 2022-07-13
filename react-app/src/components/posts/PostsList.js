import React from 'react';
// import { useDispatch } from 'react-redux';
// import { getAllPosts } from '../../store/post';
import PostHeader from './PostHeader';
import './PostsList.css';

function PostsList({posts, postIds}) {
  // const dispatch = useDispatch();
  // const [posts, setPosts] = useState([]);

  // const posts = useSelector(state => state.posts.obj);
  // const postIds = Object.keys(posts);

  // useEffect(() => {
  //   // async function fetchData() {
  //   //   const response = await fetch('/api/posts/');
  //   //   const responseData = await response.json();
  //   //   setPosts(responseData.posts);
  //   // }
  //   // fetchData();
  //   dispatch(getAllPosts());
  // }, [dispatch]);

  // console.log("### IN POSTSLIST COMPONENT:")
  // console.log("postIds:", postIds)
  // console.log("posts:", posts)

  const postComponents = postIds.map(i => {
    const post = posts[i];
    return (<PostHeader key={i} post={post} i={i} />);
  });

  return (
    <div className="postList">
      {/* <h1>Post List: </h1> */}
      <ul>{postComponents}</ul>
    </div>
  );
}

export default PostsList;
