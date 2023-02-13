// import { useSelector } from "react-redux";
// import LoginForm from "./auth/LoginForm";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetitContext } from "../context/GetitContext"
import Logo from "./Logo";
import ghIcon from '../static/images/githubIcon.svg';
import liIcon from '../static/images/linkedInIcon.png';


const Sidebar = () => {
  const { sideAdd, searchQuery, setSearchQuery } = useContext(GetitContext);

  const [query, setQuery] = useState("");
  const history = useHistory();

  const searchHandler = e => {
    e.preventDefault();
    console.log(query, e);
    setSearchQuery(query);
    history.push(`/search?query=${encodeURIComponent(query)}`);
    setQuery("");
    // console.log("yep, this still executes")
  }

  return (
    <div className="sidebar">
      <div className="sideSpaced">
        <form className="searchForm" action="/search" method="GET" onSubmit={searchHandler}>
          <input type="text"
            name="query"
            placeholder="Search GETit"
            value={query}
            onChange={e => setQuery(e.target.value)}
            // disabled={true}
          />
          <button type="submit">🔍</button>
        </form>
      {/* Here's sidebar stuff */}
      </div>
      {sideAdd.map(el => (el))}
      <div className="sideSpaced devCard">
        <Logo />
        <span class="devCardText">
          is styled after <a href="https://old.reddit.com" target="_blank">Old Reddit</a>.
        </span>
        <p>Check out the developer, who is eager to join your company.</p>
          <div className='devLinkBox'>
            <a href="https://github.com/samuelrkramer" target="_blank" rel="noreferrer">
              <img src={ghIcon} height="72px" alt="GitHub"></img>
            </a>
            <a href="https://www.linkedin.com/in/samrkramer" target="_blank" rel="noreferrer">
              <img src={liIcon} height="72px" alt="LinkedIn"></img>
            </a>
          </div>
          <br />
          {/* <h3> */}
            <a href="https://github.com/samuelrkramer/Getit" target="_blank" rel="noreferrer">Project Repo</a>
          {/* </h3> */}
      </div>
    </div>
  )
};

export default Sidebar;
