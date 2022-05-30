import React from 'react';
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage'
import { INTRO_TEXT, SITE_TITLE, LOGIN, REGISTER } from '../common/constants/pages';

const Landing = () => (
  <Wrapper>
    <nav>
      <img src={logo} alt={SITE_TITLE} className="logo" />
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
  </Wrapper>
);

export default Landing;
