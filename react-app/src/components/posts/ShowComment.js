import { useSelector } from 'react-redux';
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
  <div key={cId} className="oneComment">
    {cForm === cId && (<CommentForm mode="Edit" postId={postId} comment={comment} setCForm={setCForm} />)}
    {cForm !== cId && (
      <>
        {/* <li><i>Comment ID: {cId}</i></li> */}
        <p className="tagline">
        <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link> <span title={dateString}>
          {humanizeDuration(now-createDate, { largest: 1 } )} ago{edited?"*":""}
        </span>
        { comment.userId === user.id && (<a onClick={() => setCForm(cId)} className="xsmall minMarg">Edit</a>)}
        </p>
        <ReactMarkdown className="commBody">{comment.body}</ReactMarkdown>
        {/* <li><i>From: <Link to={`/users/${comment.userId}`}>{comment.user.username}</Link></i></li> */}
      </>
    )}
  </div>
  );
};

export default ShowComment;