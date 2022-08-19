import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import SmallSidebarWrapper from '../assets/wrappers/SmallSidebarWrapper';
import { useAppContext } from '../context/AppContext';
import links from '../utilities/links';
import Logo from './Logo';

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
          <div className="nav-links">
            {links.map(link => {
              const { icon, id, path, text } = link;
              return (
                <NavLink
                  key={id}
                  to={path}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={toggleSidebar}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </SmallSidebarWrapper>
  );
};

export default SmallSidebar;
