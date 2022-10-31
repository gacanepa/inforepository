import React from 'react';
import Chart from './Chart';
import { useAppContext } from '../context/AppContext';
import { useTranslationContext } from '../context/TranslationContext';
import ChartContainerWrapper from '../assets/wrappers/ChartContainerWrapper';

const ChartContainer = () => {
  const { monthlyPosts } = useAppContext();
  const { MONTHS, MONTHLY_POSTS } = useTranslationContext();

  const formatData = ({ data, months }) => data.map(monthData => {
    const { count, month, year } = monthData;
    return {
      count,
      date: `${months[month]} ${year}`
    };
  });

  return (
    <ChartContainerWrapper>
      <h4>{MONTHLY_POSTS}</h4>
      <Chart data={formatData({
        data: monthlyPosts,
        months: MONTHS,
      })}
      />
    </ChartContainerWrapper>
  );
};

export default ChartContainer;
