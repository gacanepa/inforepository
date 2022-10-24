import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslationContext } from '../context/TranslationContext';
import main from '../assets/images/main.svg';
import LandingPageWrapper from '../assets/wrappers/LandingPageWrapper';
import { Logo } from '../components';

const Landing = () => {
  const {
    INTRO_TEXT,
    SITE_TITLE,
    LOGIN,
    REGISTER,
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
            for organizations
          </h1>
          <p>{INTRO_TEXT}</p>
          <Link to="/register" className="btn btn-hero">
            {LOGIN}
            /
            {REGISTER}
          </Link>
        </div>
        <img src={main} alt={SITE_TITLE} className="img main-img" />
      </div>
    </LandingPageWrapper>
  );
};

export default Landing;
