import { useSelector } from "react-redux";
import LoginForm from "./auth/LoginForm";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="vspace">
        <input type="text" 
          value="Search coming soon"
          disabled={true}
        />
      Here's sidebar stuff
      </div>
    </div>
  )
};

export default Sidebar;