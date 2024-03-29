import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postVote } from '../../store/post';
import './PostHeader.css';
import humanizeDuration from 'humanize-duration';

const PostHeader = ({ post, i=null, numComments }) => {
  // console.log(i, post);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user) || false;

  const now = new Date();
  const createDate = new Date(Date.parse(post.created_at));
  // const editDate = new Date(Date.parse(post.updated_at));
  const postUrl = `/posts/${post.id}`;
  numComments = numComments || Object.keys(post.comments).length;
  let edited = false;
  let dateString = post.created_at;
  if (post.updated_at !== post.created_at) {
    dateString += ", edited "+post.updated_at;
    edited = true;
  }

  const [score, setScore] = useState(post.score);
  const [vote, setVote] = useState(post.myVote?.value || 0);

  const voteClick = async (val) => {
    if (!user) return history.push("/sign-up");
    const result = await dispatch(postVote(post.id, vote!==val?val:0, post.myVote));
    if (result && result.errors) {
      for (let err of result.errors) {
        window.alert(err);
      }
    }
    else {
      setScore(score-vote+(vote!==val?val:0));
      setVote(result.value || 0);
    }
  }

  const shareHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://skgetit.herokuapp.com${postUrl}`);
    e.target.innerHTML = "copied"
  }

  useEffect(() => {
    setVote((user && post.myVote?.value) || 0)
  }, [user]);

  return (
    <div className="listRow" key={i}>
      {i && (
        <span className="rowIndex">{i}</span>
      )}
      <div className={`voteBox voted${vote}`}>
        <div className="voteArrow voteUp" onClick={() => voteClick(1)}>⬆</div>
        <span className="voteScore">{score}</span>
        <div className="voteArrow voteDown" onClick={() => voteClick(-1)}>⬇</div>
      </div>
      <div className="rowItem">
        <p className="title">
          {/* {i && (<NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>)} */}
          {/* {!i && post.title} */}
          <Link to={postUrl}>{post.title}</Link>
        </p>
        <p className="tagline">
          submitted <span title={dateString}>
            {humanizeDuration(now-createDate, { largest: 1 } )} ago{edited?"*":""}
          </span> by <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
        </p>
        <ul className="thingMenu">
          <li>
            <Link to={postUrl}>{numComments || ""} comment{numComments>1 && "s"}</Link>
          </li>
          <li>
            <a onClick={shareHandler}>share</a>
          </li>
          {post.userId === user.id && (
            <li>
              <Link to={`/posts/${post.id}/edit`}>edit</Link><br />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostHeader;
