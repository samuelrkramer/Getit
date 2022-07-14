import { createContext, useContext, useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom';

export const GetitContext = createContext();

const GetitProvider = props => {
  const modalRef = useRef();
  const [modalVal, setModalVal] = useState();

  // const dummy = (<div>dummy sidebar context stuff</div>);
  const [sideAdd, setSideAdd] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setModalVal(modalRef.current);
  }, []);

  return (
    <>
      <GetitContext.Provider value={
        { modalVal, sideAdd, setSideAdd, searchQuery, setSearchQuery }
      }>
        {props.children}
      </GetitContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({onClose, children}) => {
  const {modalVal} = useContext(GetitContext);
  if (!modalVal) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalVal
  );
};

export default GetitProvider;