import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
} from './actions';
import { addUserToLocalStorage, removeUserFromLocalStorage } from '../utilities';
import reducer from './reducer';
import {
  CLEAR_ALERT_DELAY,
  UNAUTHORIZED,
  LOW,
  ARTICLE,
  PUBLIC,
} from '../common/constants/pages';
import { BASE_URL, SETUP_USER, UPDATE_USER } from '../common/endpoints';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  showSidebar: false,
  isEditing: false,
  editPostId: '',
  title: '',
  importance: LOW,
  classification: PUBLIC,
  type: ARTICLE,
  content: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  // Base resource for all HTTP requests
  const authFetch = axios.create({
    baseURL: BASE_URL,
  });

  // Request interceptor
  authFetch.interceptors.request.use(
    config => {
      const requestConfig = { ...config };
      requestConfig.headers.common.Authorization = `Bearer ${state.token}`;
      return requestConfig;
    },
    error => {
      throw error;
    }
  );

  // Response interceptor
  authFetch.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === UNAUTHORIZED) {
        logoutUser();
      }
      throw error;
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, CLEAR_ALERT_DELAY);
  };

  const displayAlert = ({ message }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { message } });
    clearAlert();
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await authFetch.post(SETUP_USER(endpoint), currentUser);
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { message: error.response.data.message },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updateUser = async ({ currentUser, alertText }) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await authFetch.patch(UPDATE_USER, currentUser);
      const { user, token } = response.data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== UNAUTHORIZED) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: {
            message: error.response.data.message,
          }
        });
      }
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
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
