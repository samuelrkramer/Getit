import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import ReactMarkdown from 'react-markdown';
import humanizeDuration from 'humanize-duration';

const ShowComment = ({comment, cForm, setCForm}) => {
  const user = useSelector(state => state.session.user) || false;
  const now = new Date();
  const createDate = new Date(Date.parse(comment.created_at));
  // const editDate = new Date(Date.parse(comment.updated_at));
  let edited = false;
  let dateString = comment.created_at;
  if (comment.updated_at !== comment.created_at) {
    dateString += ", edited "+comment.updated_at;
    edited = true;
  }

  const [score, setScore] = useState(comment.score);
  const [vote, setVote] = useState(comment.myVote?.value || 0);
  let pointString = `${score} point`;
  if (score !== 1) pointString += 's';

  const voteClick = async (val) => {
    setScore(score-vote+(vote!==val?val:0));
    setVote(vote!==val?val:0);

    // if (!user) return history.push("/sign-up");
    // const result = await dispatch(postVote(post.id, vote!==val?val:0, post.myVote));
    // if (result && result.errors) {
    //   for (let err of result.errors) {
    //     window.alert(err);
    //   }
    // }
    // else {
    //   setScore(score-vote+(vote!==val?val:0));
    //   setVote(result.value || 0);
    // }
  }

  return (
  <div key={comment.id} className="oneComment">
    <a name={`c${comment.id}`} />
    {cForm === comment.id && (<CommentForm mode="Edit" postId={comment.postId} comment={comment} setCForm={setCForm} />)}
    {cForm !== comment.id && (
      <>
        <div className={`voteBox voted${vote}`}>
          <div className="voteArrow voteUp" onClick={() => voteClick(1)}>⬆</div>
          {/* <span className="voteScore">{score}</span> */}
          <div className="voteArrow voteDown" onClick={() => voteClick(-1)}>⬇</div>
        </div>
        {/* <li><i>Comment ID: {comment.id}</i></li> */}
        <div className="commentStuff">
          <p className="tagline">
            <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link>
            <span title={score}>{pointString}</span>
            <span title={dateString}>
              {humanizeDuration(now-createDate, { largest: 1 } )} ago{edited?"*":""}
            </span>
            { comment.userId === user.id && (<a onClick={() => setCForm(comment.id)} className="xsmall minMarg">Edit</a>)}
          </p>
          <ReactMarkdown className="commBody">{comment.body}</ReactMarkdown>
          {/* <li><i>From: <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link></i></li> */}
          <ul className="thingMenu">
            <li>
              <Link to={`/posts/${comment.postId}#c${comment.id}`}>permalink</Link>
            </li>
            {/* <li>
              <a onClick={shareHandler}>share</a>
            </li> */}
            {comment.userId === user.id && (
              <li>
                <a onClick={() => setCForm(comment.id)}>edit</a>
              </li>
            )}
          </ul>
        </div>
      </>
    )}
  </div>
  );
};

export default ShowComment;
