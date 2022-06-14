import { Link } from "react-router-dom";
import './logo.css';

const Logo = () => {
  return(
    <div className="logo">
      <Link to="/">
        🤣GETit
      </Link>
    </div>
  )
};

export default Logo;