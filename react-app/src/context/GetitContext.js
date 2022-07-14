import { createContext, useContext, useState, useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';

export const GetitContext = createContext();

const GetitProvider = props => {
  const modalRef = useRef();
  const [modalNode, setModalVal] = useState();

  // const dummy = (<div>dummy sidebar context stuff</div>);
  const [sideAdd, setSideAdd] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setModalVal(modalRef.current);
  }, []);

  return (
    <>
      <GetitContext.Provider value={
        { modalNode, sideAdd, setSideAdd, searchQuery, setSearchQuery }
      }>
        {props.children}
      </GetitContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({onClose, children}) => {
  const {modalNode} = useContext(GetitContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
};

export default GetitProvider;