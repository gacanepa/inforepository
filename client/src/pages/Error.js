import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import ErrorPageWrapper from '../assets/wrappers/ErrorPageWrapper';
import { BACK_TO_HOME, ERROR, NOT_FOUND } from '../common/constants/pages';

const Error = () => (
  <ErrorPageWrapper className="full-page">
    <div>
      <img src={img} alt={ERROR} className="img main-img" />
      <h3>{NOT_FOUND}</h3>
      <Link to="/">{BACK_TO_HOME}</Link>
    </div>
  </ErrorPageWrapper>
);

export default Error;
