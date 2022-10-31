/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslationContext } from '../context/TranslationContext';

const Chart = ({ data }) => {
  const { MONTH, COUNT } = useTranslationContext();

  const renderTooltip = active => {
    const { active: isActive, payload, label } = active;
    if (isActive) return `${label}: ${payload[0].value}`;
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: MONTH, position: 'insideBottom' }} />
        <YAxis
          allowDecimals={false}
          label={{
            value: COUNT,
            angle: -90,
            position: 'insideLeft'
          }}
        />
        <Tooltip cursor={false} content={renderTooltip} />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default Chart;
