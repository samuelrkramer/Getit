import { NavLink, Link } from 'react-router-dom';
import './PostHeader.css';
import { ago } from '../utils';

const PostHeader = ({ post, i=null }) => {
  console.log(i, post);
  return (
    <div className="listRow" key={i}>
      <span class="rowIndex">{i}</span>
      <div className="rowItem">
        <p className="title">
          <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
        </p>
        <p className="tagline">
          submitted at {ago(post.created_at)} by <Link to={`/users/${post.userId}`}>{post.user.username}</Link>
        </p>
      </div>
    </div>
  );
}

export default PostHeader;