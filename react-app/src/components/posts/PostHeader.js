import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postVote } from '../../store/post';
import './PostHeader.css';
import humanizeDuration from 'humanize-duration';

const PostHeader = ({ post, i=null }) => {
  // console.log(i, post);
  const dispatch = useDispatch();

  const now = new Date();
  const createDate = new Date(Date.parse(post.created_at));
  // const editDate = new Date(Date.parse(post.updated_at));
  let edited = false;
  let dateString = post.created_at;
  if (post.updated_at !== post.created_at) {
    dateString += ", edited "+post.updated_at;
    edited = true;
  }
  const [score, setScore] = useState(post.score);
  const [vote, setVote] = useState(post.myVote?.value || 0);

  const voteUp = async () => {
    const result = await dispatch(postVote(post.id, vote!==1?1:0, post.myVote));
    if (result && result.errors) {
      for (let err of result.errors) {
        window.alert(err);
      }
    }
    // if (!errors) setErrors(["test error"]);
    else {
      setScore(score-vote+(vote<=0));
      setVote(result.value || 0);
    }
  }
  const voteDown = async () => {
    const result = await dispatch(postVote(post.id, vote!==-1?-1:0, post.myVote));
    if (result && result.errors) {
      for (let err of result.errors) {
        window.alert(err);
      }
    }
    // if (!errors) setErrors(["test error"]);
    else {
      setScore(score-vote-(vote>=0));
      setVote(result.value || 0);
    }
  }
  return (
    <div className="listRow" key={i}>
      {i && (
        <span className="rowIndex">{i}</span>
      )}
      <div className={`voteBox voted${vote}`}>
        <div className="voteArrow voteUp" onClick={voteUp}>⬆</div>
        <span className="voteScore">{score}</span>
        <div className="voteArrow voteDown" onClick={voteDown}>⬇</div>
      </div>
      <div className="rowItem">
        <p className="title">
          {/* {i && (<NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>)} */}
          {/* {!i && post.title} */}
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </p>
        <p className="tagline">
          submitted <span title={dateString}>
            {humanizeDuration(now-createDate, { largest: 1 } )} ago{edited?"*":""}
          </span> by <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
        </p>
      </div>
    </div>
  );
}

export default PostHeader;
