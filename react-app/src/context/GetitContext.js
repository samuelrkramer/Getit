import { createContext, useState } from "react";

export const GetitContext = createContext();

const GetitProvider = props => {
  // const dummy = (<div>dummy sidebar context stuff</div>);
  const [sideAdd, setSideAdd] = useState([]);
  return (
    <GetitContext.Provider value={{ sideAdd, setSideAdd }}>
      {props.children}
    </GetitContext.Provider>
  );
};

export default GetitProvider;