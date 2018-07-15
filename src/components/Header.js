import React from 'react';
import { Link } from 'react-router-dom';
import TopicSelector from './TopicSelector';
import logo from '../images/Logo.png';

const Header = ({ currentUser, handleLogout, handleLogin }) => {
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="navbar-brand">
        <Link
          className="navbar-item navbar-brand"
          to={`/`}
          style={{ textDecoration: 'none' }}
        >
          <img id="logo" src={logo} alt="northcoders logo" />
        </Link>
      </div>
      <div className="navbar-end">
        <TopicSelector />
        {currentUser.length === 0 && (
          <button
            className="navbar-item button"
            value="login"
            onClick={e => handleClick(e, handleLogin)}
          >
            Login
          </button>
        )}
        {currentUser.length > 0 && (
          <button
            className="navbar-item button"
            value="logout"
            onClick={e => handleClick(e, handleLogout)}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const handleClick = (e, func) => {
  func();
};

export default Header;
