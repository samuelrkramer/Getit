import React from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <a href="#" onClick={onLogout}>logout</a>;
};

export default LogoutButton;
