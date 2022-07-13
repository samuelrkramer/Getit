
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { loginDemo } from '../store/session';
import Logo from './Logo';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const separator = (<span className="separator">|</span>);

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(loginDemo());
    return data;
  };

  return (
    <nav>
      <div className="navleft">
        <Logo />
        <ul className="menu">
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              users
            </NavLink>
          </li>
          <li>
            <NavLink to='/posts' activeClassName='active'>
              POSTs
            </NavLink>
          </li>
          <li>
            <NavLink to='/newest' exact={true} activeClassName='active'>
              newest
            </NavLink>
          </li>
          {user && (
            <>
            <li>
              <NavLink to='/posts/new' exact={true} activeClassName='active'>
                create POST
              </NavLink>
            </li>
          </>
          )}
        </ul>
      </div>
      <div className="sessionbox">
        {/* <ul> */}
          {user && (
            <>
              <span>
                logged in as <Link to={`/users/${user.id}`} >{user.username}</Link>
              </span>
              {separator}
              <span>
                <LogoutButton />
              </span>
            </>
          )}
          {!user && (
            <>
              <span>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </span>
                {separator}
              <span>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </span>
              {separator}
              <span className="bold">
                <a href="#" onClick={demoLogin}>demo</a>
              </span>
            </>
          )}
        {/* </ul> */}
      </div>
    </nav>
  );
}

export default NavBar;
