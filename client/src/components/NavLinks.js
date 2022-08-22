import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import links from '../utilities/links';

const NavLinks = ({ toggleSidebar }) => (
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
);

NavLinks.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavLinks;
