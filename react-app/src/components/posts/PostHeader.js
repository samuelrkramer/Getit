import { Link } from 'react-router-dom';
import './PostHeader.css';
import humanizeDuration from 'humanize-duration';

const PostHeader = ({ post, i=null }) => {
  // console.log(i, post);
  const now = new Date();
  const createDate = new Date(Date.parse(post.created_at));
  // const editDate = new Date(Date.parse(post.updated_at));
  let edited = false;
  let dateString = post.created_at;
  if (post.updated_at !== post.created_at) {
    dateString += ", edited "+post.updated_at;
    edited = true;
  }
  const score = Object.values(post.votes).reduce((sum, v) => sum+v, 0);
  return (
    <div className="listRow" key={i}>
      {i && (
        <span className="rowIndex">{i}</span>
      )}
      <div className="voteBox">
        {score}
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
