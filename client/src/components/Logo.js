import React from 'react';
import logo from '../assets/images/logo.svg';
import { useTranslationContext } from '../context/TranslationContext';

const Logo = () => {
  const { SITE_TITLE } = useTranslationContext();

  return (
    <img src={logo} alt={SITE_TITLE} className="logo" />
  );
};

export default Logo;
