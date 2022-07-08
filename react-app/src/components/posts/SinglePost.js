import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOnePost } from '../../store/post';
import { getPostsComments } from '../../store/comment';
import PostHeader from './PostHeader';
import CommentForm from './CommentForm';
import { GetitContext } from '../context/GetitContext';
import './SinglePost.css'
import ReactMarkdown from 'react-markdown';
import humanizeDuration from 'humanize-duration';

function SinglePost() {
  const { setSideAdd } = useContext(GetitContext);
  let { postId } = useParams();
  const dispatch = useDispatch();
  // postId = parseInt(postId);
  const post = useSelector(state => state.posts.obj[postId]);
  const comments = useSelector(state => state.comments.onPost[postId]);
  const cIds = Object.keys(comments || {});

  const [cForm, setCForm ] = useState(false);
  
  const user = useSelector(state => state.session.user) || false;

  useEffect(async () => {
    if (!post) {
      dispatch(getOnePost(postId))
    }

  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostsComments(postId))
  }, [postId, dispatch]);

  useEffect(() => {
    if (!user) setCForm(false);
  }, [user]);

  useEffect(() => {
    // const postDate = new Date(Date.parse(post.date));
    if (post) {
        setSideAdd([(
        <div className="sideSpaced postCard">{post.id} - {post.title}<br />
        {/* Posted on {postDate.toDateString()}<br/> */}
        {/* Click to copy URL to POST: */}
        <input
          type="text"
          disabled={true}
          value={`https://skgetit.heroku.com/posts/${post.id}`}
          // onClick={e => Clipboard.writeText(e.target.value)}
        />
        </div>
      )])
    }
    return () => { setSideAdd([]);}
  }, [post])

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
          {/* <span className="rowIndex">{null}</span> */}
          <div className="body">
            <ReactMarkdown>
              {post.body}
            </ReactMarkdown>
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
                    {humanizeDuration(now-createDate, { largest: 1 } )} ago{edited?"*":""}
                  </span>
                  { comment.userId === user.id && (<Link onClick={() => setCForm(cId)} className="xsmall minMarg">Edit</Link>)}
                  </p>
                  <ReactMarkdown className="commBody">{comment.body}</ReactMarkdown>
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
