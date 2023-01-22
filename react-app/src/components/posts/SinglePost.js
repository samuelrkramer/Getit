import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOnePost } from '../../store/post';
import { getPostsComments } from '../../store/comment';
import PostHeader from './PostHeader';
import CommentForm from './CommentForm';
import ShowComment from './ShowComment';
import { GetitContext } from '../../context/GetitContext';
import './SinglePost.css'
import ReactMarkdown from 'react-markdown';
// import humanizeDuration from 'humanize-duration';

function SinglePost() {
  const { setSideAdd } = useContext(GetitContext);
  let { postId } = useParams();
  const dispatch = useDispatch();
  // postId = parseInt(postId);
  const post = useSelector(state => state.posts.obj[postId]);
  const [loaded, setLoaded] = useState(!!post);
  const comments = useSelector(state => state.comments.onPost[postId]);
  const cIds = Object.keys(comments || {});
  const shareURL = window.location.href.replace(/[\?\#].*$/,"");

  const [cForm, setCForm ] = useState(false);
  
  const user = useSelector(state => state.session.user) || false;

  useEffect(async () => {
    if (!post) {
      dispatch(getOnePost(postId));
    }
    setLoaded(true);
  }, [dispatch, post, postId]);

  useEffect(() => {
    dispatch(getPostsComments(postId));
  }, [postId, dispatch]);

  useEffect(() => {
    if (!user) setCForm(false);
  }, [user]);

  useEffect(() => {
    // const postDate = new Date(Date.parse(post.date));
    const urlClick = e => {
      // console.log("test urlclick");
      // console.log(e.target);
      // window.alert("urlclick fired")
      navigator.clipboard.writeText(shareURL);
      e.target.innerHTML = "(copied)"
    };

    if (post) {
      const createDate = new Date(Date.parse(post.created_at));
      setSideAdd([(
        <div className="sideSpaced postCard">
          <span className="xsmall">This POST was submitted on {createDate.toLocaleDateString()}</span><br />
          <div className="scoreCard">
            <b>
              {post.score} point{post.score!==1 && (<>s</>)}
            </b> <span className="xsmall">({Math.round(100*(post.upvotes/post.nVotes || 0))}% upvoted)</span>
          </div>
          {/* Posted on {postDate.toDateString()}<br/> */}
          {/* Click to copy URL to POST: */}
          <span className="tagline">Shareable URL: <a onClick={urlClick}>(copy)</a></span>
          <input
            type="text"
            className="shareURL"
            disabled={true}
            // value={`https://skgetit.heroku.com/posts/${post.id}`}
            value={shareURL}
            // style={{width: "280px"}}
            onClick={ () => console.log("omg it clicked") }
          />
        </div>
      )])
    }
    return () => { setSideAdd([]);}
  }, [post]);
  
  if (!loaded) {
    return (<h2>Loading...</h2>)
  }

  if (!post) {
    return (<h4>No post to display. Please <Link to="/posts">go back</Link> and try again.</h4>);
  }

  return (
    <>
      <PostHeader post={post} numComments={cIds.length} />
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
      {/* {post.userId === user.id && (
        <div>
          <Link to={`/posts/${post.id}/edit`} >Edit</Link><br />
        </div>
      )} */}
      <div className="title">
        {cIds.length?`viewing ${cIds.length} comments`:"no comments (yet)"}
        { cForm !== true && user && (<> | <a onClick={() => setCForm(true)}>comment on this</a></>)}
      { cForm === true && (<CommentForm mode="Create" postId={postId} setCForm={setCForm} />)}
      </div>
      {cIds.length > 0 && (
        <div>
          {cIds.map(cId => {
            const comment = comments[cId];
            return (
              <ShowComment key={cId} comment={comment} cForm={cForm} setCForm={setCForm} />
            )
          })}
        </div>
      )}
    </>
  );
}
export default SinglePost;
