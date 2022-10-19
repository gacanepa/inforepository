import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyPosts } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <StatsContainer />
      {monthlyPosts.length > 0 && <ChartsContainer />}
    </div>
  );
};

export default Stats;
