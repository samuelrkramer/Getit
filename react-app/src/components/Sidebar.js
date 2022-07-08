// import { useSelector } from "react-redux";
// import LoginForm from "./auth/LoginForm";
import { useContext } from "react";
import { GetitContext } from "./context/GetitContext";
import Logo from "./Logo";

const Sidebar = () => {
  const { sideAdd } = useContext(GetitContext);
  return (
    <div className="sidebar">
      <div className="sideSpaced">
        <input type="text" 
          value="Search coming soon"
          disabled={true}
        />
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