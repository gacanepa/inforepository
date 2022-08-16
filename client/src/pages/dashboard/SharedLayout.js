import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SharedLayoutWrapper from '../../assets/wrappers/SharedLayoutWrapper';
import { ALL_POSTS, ADD_POST } from '../../common/constants/pages';

const SharedLayout = () => (
  <SharedLayoutWrapper>
    <nav>
      <Link to="/add-post">{ADD_POST}</Link>
      <Link to="/all-posts">{ALL_POSTS}</Link>
    </nav>
    <Outlet />
  </SharedLayoutWrapper>
);

export default SharedLayout;
