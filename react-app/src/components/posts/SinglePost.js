import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPostsComments } from '../../store/comment';
import CommentForm from './CommentForm';

function SinglePost() {
  let { postId } = useParams();
  const dispatch = useDispatch();
  // postId = parseInt(postId);
  const post = useSelector(state => state.posts.obj[postId]);
  const comments = useSelector(state => state.comments.onPost[postId]);
  const cIds = Object.keys(comments || {});

  const [cForm, setCForm ] = useState(false);
  // const hideCForm = () => setCForm(false);
  // console.log("singlepost render, setCForm:", setCForm);
  // console.log("singlepost render, hideCForm:", hideCForm);

  const [editing, setEditing ] = useState(0)

  // const [post, setPost] = useState({});
  // const { postId }  = useParams();
  const user = useSelector(state => state.session.user)

  // console.log("In SinglePost component, postId:", postId)

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

  if (!post) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <strong>Post Id</strong> {postId}
        </li>
        <li>
          <strong>User Id</strong> {post.userId}
        </li>
        <li>
          <strong>Title</strong> {post.title}
        </li>
        {post.body && (
          <li>
            <strong>Body</strong> {post.body}
          </li>
        )}
        {post.userId === user.id && (
          <Link to={`/posts/${post.id}/edit`} >Edit</Link>
          )}
      </ul>
      { cForm !== true && (<Link onClick={() => setCForm(true)}>Comment on this</Link>)}
      { cForm === true && (<CommentForm mode="Create" postId={postId} setCForm={setCForm} />)}
      {cIds.length > 0 && (
        <div>
          <h2>Comments:</h2>
          {cIds.map(cId => (
            <div key={cId}>
              {cForm === cId && (<CommentForm mode="Edit" postId={postId} comment={comments[cId]} setCForm={setCForm} />)}
              {cForm !== cId && (
                <ul>
                  <li><i>Comment ID: {cId}</i></li>
                  <li>{comments[cId].body}</li>
                  <li><i>From: ID#{comments[cId].userId}</i></li>
                  { comments[cId].userId === user.id && (<Link onClick={() => setCForm(cId)}>Edit</Link>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default SinglePost;
