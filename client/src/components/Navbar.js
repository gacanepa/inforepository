import React, { useState } from 'react';
import { useTranslationContext } from '../context/TranslationContext';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import Logo from './Logo';
import NavbarWrapper from '../assets/wrappers/NavbarWrapper';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, toggleSidebar, logoutUser } = useAppContext();
  const { DASHBOARD, LOGOUT } = useTranslationContext();

  return (
    <NavbarWrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">{DASHBOARD}</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.firstName}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
            >
              {LOGOUT}
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
