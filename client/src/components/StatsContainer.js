import React from 'react';
import { FaSuitcaseRolling } from 'react-icons/fa';
import { useTranslationContext } from '../context/TranslationContext';
import StatItem from './StatItem';
import { useAppContext } from '../context/AppContext';
import StatsContainerWrapper from '../assets/wrappers/StatsContainerWrapper';

const StatsContainer = () => {
  const { stats } = useAppContext();
  const { CRITICAL, HIGH, LOW, MEDIUM } = useTranslationContext();

  const initialStats = [
    {
      title: LOW,
      count: stats.Low,
      icon: <FaSuitcaseRolling />,
      color: '#62c370',
      bcg: '#c2f9bb',
    },
    {
      title: MEDIUM,
      count: stats.Medium,
      icon: <FaSuitcaseRolling />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: HIGH,
      count: stats.High,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: CRITICAL,
      count: stats.Critical,
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
