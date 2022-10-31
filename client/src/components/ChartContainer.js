import React from 'react';
import BarChart from './BarChart';
import { useAppContext } from '../context/AppContext';
import { useTranslationContext } from '../context/TranslationContext';
import ChartContainerWrapper from '../assets/wrappers/ChartContainerWrapper';

const ChartContainer = () => {
  const { monthlyApplications: data } = useAppContext();
  const { MONTHLY_POSTS } = useTranslationContext();

  return (
    <ChartContainerWrapper>
      <h4>{MONTHLY_POSTS}</h4>
      <BarChart data={data} />
    </ChartContainerWrapper>
  );
};

export default ChartContainer;
