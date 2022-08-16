import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import LandingPageWrapper from '../assets/wrappers/LandingPageWrapper';
import { Logo } from '../components';
import {
  INTRO_TEXT,
  SITE_TITLE,
  LOGIN,
  REGISTER,
} from '../common/constants/pages';

const Landing = () => (
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

export default Landing;
