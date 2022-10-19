import React from 'react';
import { FaSuitcaseRolling } from 'react-icons/fa';
import StatItem from './StatItem';
import { useAppContext } from '../context/AppContext';
import StatsContainerWrapper from '../assets/wrappers/StatsContainerWrapper';
import { CRITICAL, HIGH, LOW, MEDIUM, STATS } from '../common/constants/pages';

const StatsContainer = () => {
  const { stats } = useAppContext();

  const initialStats = [
    {
      title: LOW,
      count: stats[LOW],
      icon: <FaSuitcaseRolling />,
      color: '#62c370',
      bcg: '#c2f9bb',
    },
    {
      title: MEDIUM,
      count: stats[MEDIUM],
      icon: <FaSuitcaseRolling />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: HIGH,
      count: stats[HIGH],
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: CRITICAL,
      count: stats[CRITICAL],
      icon: <FaSuitcaseRolling />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <StatsContainerWrapper>
      {initialStats.map(item => (
        <StatItem
          key={item.title}
          title={item.title}
          count={item.count}
          icon={item.icon}
          color={item.color}
          bcg={item.bcg}
        />
      ))}
    </StatsContainerWrapper>
  );
};

export default StatsContainer;
