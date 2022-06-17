import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostsComments } from '../../store/comment';
import PostHeader from './PostHeader';
import CommentForm from './CommentForm';

function SinglePost() {
  let { postId } = useParams();
  const dispatch = useDispatch();
  // postId = parseInt(postId);
  const post = useSelector(state => state.posts.obj[postId]);
  const comments = useSelector(state => state.comments.onPost[postId]);
  const cIds = Object.keys(comments || {});

  const [cForm, setCForm ] = useState(false);
  
  const user = useSelector(state => state.session.user) || false;

  useEffect(() => {
    if (!post) {
      return ("Loading...");
    }
    // (async () => {
    //   const response = await fetch(`/api/posts/${postId}`);
    //   const post = await response.json();
    //   setPost(post);
    // })();
  }, [post]);

  useEffect(() => {
    dispatch(getPostsComments(postId))
  }, [postId, dispatch])

  useEffect(() => {
    if (!user) setCForm(false);
  }, [user])

  if (!post) {
    return (<h4>No post to display. Please <Link to="/posts">go back</Link> and try again.</h4>);
  }

  return (
    <>
      <PostHeader post={post} />
      {/* <ul> */}
        {/* <li>
          <strong>Post Id</strong> {postId}
        </li>
        <li>
          <strong>User</strong> <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
        </li>
        <li>
          <strong>Title</strong> {post.title}
        </li> */}
        {post.body && (
          <>
          {/* <span class="rowIndex">{null}</span> */}
          <div className="body">
            <p>
              {post.body}
            </p>
          </div>
          </>
        )}
        <div className="bigLeftMargin">
          {post.userId === user.id && (
            <>
            <Link to={`/posts/${post.id}/edit`} >Edit</Link><br />
            </>
          )}
        {/* </ul> */}
        { cForm !== true && user && (<Link onClick={() => setCForm(true)}>Comment on this</Link>)}
        { cForm === true && (<CommentForm mode="Create" postId={postId} setCForm={setCForm} />)}
      </div>
      {cIds.length > 0 && (
        <div>
          <h2>Comments:</h2>
          {cIds.map(cId => {
            const comment = comments[cId];
            return (
            <div key={cId}>
              {cForm === cId && (<CommentForm mode="Edit" postId={postId} comment={comment} setCForm={setCForm} />)}
              {cForm !== cId && (
                <ul>
                  <li><i>Comment ID: {cId}</i></li>
                  <li>{comment.body}</li>
                  <li><i>From: <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link></i></li>
                  { comment.userId === user.id && (<Link onClick={() => setCForm(cId)}>Edit</Link>)}
                </ul>
              )}
            </div>
          )})}
        </div>
      )}
    </>
  );
}
export default SinglePost;
