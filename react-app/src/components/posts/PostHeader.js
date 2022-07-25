import { Link } from 'react-router-dom';
import './PostHeader.css';
import humanizeDuration from 'humanize-duration';

const PostHeader = ({ post, i=null }) => {
  const user = useSelector(state => state.session.user) || false;
  // console.log(i, post);
  const now = new Date();
  const createDate = new Date(Date.parse(post.created_at));
  // const editDate = new Date(Date.parse(post.updated_at));
  const postUrl = `/posts/${post.id}`;
  const numComments = Object.keys(post.comments).length;
  let edited = false;
  let dateString = post.created_at;
  if (post.updated_at !== post.created_at) {
    dateString += ", edited "+post.updated_at;
    edited = true;
  }

  const shareHandler = e => {
    e.preventDefault();
    navigator.clipboard.writeText(`https://skgetit.herokuapp.com${postUrl}`);
    e.target.innerHTML = "copied"
  }
  return (
    <div className="listRow" key={i}>
      {i && (
        <span className="rowIndex">{i}</span>
      )}
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