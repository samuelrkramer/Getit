// import { useSelector } from "react-redux";
// import LoginForm from "./auth/LoginForm";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetitContext } from "../context/GetitContext"
import Logo from "./Logo";

const Sidebar = () => {
  const { sideAdd } = useContext(GetitContext);

  const [query, setQuery] = useState("");
  const history = useHistory();

  const searchHandler = e => {
    e.preventDefault();
    console.log(query, e);
    history.push(`/search?query=${encodeURIComponent(query)}`);
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
      Here's sidebar stuff
      </div>
      {sideAdd.map(el => (el))}
      <div className="sideSpaced devCard">
        <Logo /> is made by
      </div>
    </div>
  )
};

export default Sidebar;