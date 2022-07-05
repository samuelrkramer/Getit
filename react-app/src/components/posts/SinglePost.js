import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostsComments } from '../../store/comment';
import PostHeader from './PostHeader';
import CommentForm from './CommentForm';
import './SinglePost.css'
import humanizeDuration from 'humanize-duration';

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
        <div className="bigLeftMargin">
          <h2>Comments:</h2>
          {cIds.map(cId => {
            const comment = comments[cId];
            const now = new Date();
            const createDate = new Date(Date.parse(comment.created_at));
            const editDate = new Date(Date.parse(comment.updated_at));
            let edited = false;
            let dateString = comment.created_at;
            if (comment.updated_at != comment.created_at) {
              dateString += ", edited "+comment.updated_at;
              edited = true;
            }
            return (
            <div key={cId}>
              {cForm === cId && (<CommentForm mode="Edit" postId={postId} comment={comment} setCForm={setCForm} />)}
              {cForm !== cId && (
                <div className="oneComment">
                  {/* <li><i>Comment ID: {cId}</i></li> */}
                  <p className="tagline">
                  <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link> <span title={dateString}>
                    {humanizeDuration(now-createDate, { largest: 1 } )+(edited?"*":"")} ago
                  </span>
                  { comment.userId === user.id && (<Link onClick={() => setCForm(cId)} className="xsmall minMarg">Edit</Link>)}
                  </p>
                  <p className="commBody">{comment.body}</p>
                  {/* <li><i>From: <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link></i></li> */}
                </div>
              )}
            </div>
          )})}
        </div>
      )}
    </>
  );
}
export default SinglePost;
