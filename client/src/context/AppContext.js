import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions';
import { addUserToLocalStorage } from '../utilities';
import reducer from './reducer';
import { CLEAR_ALERT_DELAY } from '../common/constants/pages';
import { REGISTER_USER } from '../common/endpoints';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
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

  const registerUser = async currentUser => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(REGISTER_USER, currentUser);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { message: error.response.data.msg },
      });
    }

    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
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
