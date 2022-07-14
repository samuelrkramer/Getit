import { createContext, useState } from "react";

export const GetitContext = createContext();

const GetitProvider = props => {
  // const dummy = (<div>dummy sidebar context stuff</div>);
  const [sideAdd, setSideAdd] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <GetitContext.Provider value={
      { sideAdd, setSideAdd, searchQuery, setSearchQuery }
    }>
      {props.children}
    </GetitContext.Provider>
  );
};

export default GetitProvider;