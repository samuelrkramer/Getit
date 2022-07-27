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
  return (
  <div key={comment.id} className="oneComment">
    <a name={`c${comment.id}`} />
    {cForm === comment.id && (<CommentForm mode="Edit" postId={comment.postId} comment={comment} setCForm={setCForm} />)}
    {cForm !== comment.id && (
      <>
        {/* <li><i>Comment ID: {comment.id}</i></li> */}
        <p className="tagline">
          <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link> <span title={dateString}>
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
          {/* {comment.userId === user.id && (
            <li>
              <Link to={`/posts/${post.id}/edit`}>edit</Link><br />
            </li>
          )} */}
        </ul>
      </>
    )}
  </div>
  );
};

export default ShowComment;