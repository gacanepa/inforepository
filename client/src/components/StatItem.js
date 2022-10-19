import React from 'react';
import PropTypes from 'prop-types';
import StatItemWrapper from '../assets/wrappers/StatItemWrapper';

const StatItem = ({
  title,
  count,
  icon,
  color,
  bcg
}) => (
  <StatItemWrapper color={color} bcg={bcg}>
    <header>
      <span className="count">{count}</span>
      <div className="icon">{icon}</div>
    </header>
    <h5 className="title">{title}</h5>
  </StatItemWrapper>
);

StatItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  bcg: PropTypes.string.isRequired,
};

export default StatItem;
