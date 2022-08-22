import React from 'react';
import LargeSidebarWrapper from '../assets/wrappers/LargeSidebarWrapper';
import Logo from './Logo';
import { useAppContext } from '../context/AppContext';
import NavLinks from './NavLinks';

const LargeSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <LargeSidebarWrapper>
      {/* Display the large sidebar by default when the user logs in */}
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </LargeSidebarWrapper>
  );
};

export default LargeSidebar;
