import React from 'react';
import { Link } from 'react-router-dom';
import TopicSelector from './TopicSelector';
import logo from '../images/Logo.png';

const Header = ({ currentUser, handleLogout, handleLogin }) => {
  return (
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <Link
          className="navbar-item navbar-brand"
          to={`/`}
          style={{ textDecoration: 'none' }}
        >
          <img id="logo" src={logo} alt="northcoders logo" />
        </Link>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <div class="navbar-start">
                  <TopicSelector />
                </div>
              </p>
              <p class="control">
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const handleClick = (e, func) => {
  func();
};

export default Header;
