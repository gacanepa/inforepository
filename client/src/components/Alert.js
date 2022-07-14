import React from 'react';
import { useAppContext } from '../context/AppContext';

const Alert = () => {
  const { alertText, alertType } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
