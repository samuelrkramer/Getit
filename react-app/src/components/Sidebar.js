// import { useSelector } from "react-redux";
// import LoginForm from "./auth/LoginForm";
import { useContext } from "react";
import { GetitContext } from "./context/GetitContext";

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
    </div>
  )
};

export default Sidebar;