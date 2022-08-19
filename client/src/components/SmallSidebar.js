import React from 'react';
import { FaTimes } from 'react-icons/fa';
import SmallSidebarWrapper from '../assets/wrappers/SmallSidebarWrapper';
import { useAppContext } from '../context/AppContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <SmallSidebarWrapper>
      <div className={
        showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
      }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </SmallSidebarWrapper>
  );
};

export default SmallSidebar;
