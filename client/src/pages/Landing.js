import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslationContext } from '../context/TranslationContext';
import main from '../assets/images/main.svg';
import LandingPageWrapper from '../assets/wrappers/LandingPageWrapper';
import { Logo } from '../components';
import SwitchLanguage from '../components/SwitchLanguage';

const Landing = () => {
  const {
    INTRO_TEXT,
    SITE_TITLE,
    LOGIN,
    REGISTER,
    FOR_ORGANIZATIONS,
  } = useTranslationContext();

  return (
    <LandingPageWrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>{SITE_TITLE}</span>
            <span> </span>
            {FOR_ORGANIZATIONS}
          </h1>
          <p>{INTRO_TEXT}</p>
          <Link to="/register" className="btn btn-hero">
            {LOGIN}
            /
            {REGISTER}
          </Link>
          <SwitchLanguage />
        </div>
        <img src={main} alt={SITE_TITLE} className="img main-img" />
      </div>
    </LandingPageWrapper>
  );
};

export default Landing;
