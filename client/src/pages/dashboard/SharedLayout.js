import React from 'react';
import { Outlet } from 'react-router-dom';
import SharedLayoutWrapper from '../../assets/wrappers/SharedLayoutWrapper';
import { Navbar, SmallSidebar, LargeSidebar } from '../../components';

const SharedLayout = () => (
  <SharedLayoutWrapper>
    <main className="dashboard">
      {/* CSS controls which sidebar is visible based on the screen size */}
      <SmallSidebar />
      <LargeSidebar />
      <div>
        <Navbar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </main>
  </SharedLayoutWrapper>
);

export default SharedLayout;
