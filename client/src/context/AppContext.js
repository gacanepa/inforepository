import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';
import reducer from './reducer';
import { CLEAR_ALERT_DELAY } from '../common/constants/pages';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, CLEAR_ALERT_DELAY);
  };

  const displayAlert = ({ message }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { message } });
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, initialState, useAppContext };
