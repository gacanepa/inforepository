import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ center }) => (
  <div className={center ? 'loading loading-center' : 'loading'} />
);

Loading.defaultProps = {
  center: false,
};

Loading.propTypes = {
  center: PropTypes.bool,
};

export default Loading;
