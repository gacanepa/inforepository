import React from 'react';
import logo from '../assets/images/logo.svg';
import { SITE_TITLE } from '../common/constants/pages';

const Logo = () => {
  return <img src={logo} alt={SITE_TITLE} className="logo" />;
};

export default Logo;
