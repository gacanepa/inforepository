import React from 'react';
import main from '../assets/images/main.svg';
import LandingPageWrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import { INTRO_TEXT, SITE_TITLE, LOGIN, REGISTER } from '../common/constants/pages';

const Landing = () => (
  <LandingPageWrapper>
    <nav>
      <Logo />
    </nav>
    <div className="container page">
      <div className="info">
        <h1>
          <span>{SITE_TITLE}</span> for organizations
        </h1>
        <p>{INTRO_TEXT}</p>
        <button className="btn btn-hero">
          {LOGIN} / {REGISTER}
        </button>
      </div>
      <img src={main} alt={SITE_TITLE} className="img main-img" />
    </div>
  </LandingPageWrapper>
);

export default Landing;
