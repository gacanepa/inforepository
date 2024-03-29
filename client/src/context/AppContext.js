/* eslint-disable no-console */
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
  CLEAR_VALUES,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  SET_EDIT_POST,
  DELETE_POST_BEGIN,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions';
import { useTranslationContext } from './TranslationContext';
import { UNAUTHORIZED, CLEAR_ALERT_DELAY } from '../common/constants';
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUnlocalizedKey,
} from '../utilities';
import reducer from './reducer';
import { BASE_URL, SETUP_USER, UPDATE_USER, HANDLE_POST } from '../common/endpoints';

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
  content: '',
  posts: [],
  totalPosts: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyPosts: [],
  search: '',
};

const AppContext = React.createContext(undefined);

const AppProvider = ({ children }) => {
  const {
    ALL,
    LATEST,
    OLDEST,
    ARTICLE,
    MEDIUM,
    PUBLIC,
    PRIVATE,
    TASK,
    LOW,
    HIGH,
    CRITICAL,
    IMPORTANCE,
    TYPE,
    CLASSIFICATION,
    SORT_CRITERIA,
  } = useTranslationContext();
  const [state, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
      importance: MEDIUM,
      classification: PUBLIC,
      type: ARTICLE,
      searchClassification: ALL,
      classificationOptions: [ALL, PUBLIC, PRIVATE],
      searchType: ALL,
      typeOptions: [ALL, ARTICLE, TASK],
      searchImportance: ALL,
      importanceOptions: [ALL, LOW, MEDIUM, HIGH, CRITICAL],
      sortOptions: [OLDEST, LATEST],
      sort: OLDEST,
    }
  );

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
    config => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${state.token}`,
      },
    }),
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
    dispatch({
      type: TOGGLE_SIDEBAR,
      payload: {
        low: LOW,
        public: PUBLIC,
        article: ARTICLE,
      }
    });
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

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
      payload: {
        low: LOW,
        public: PUBLIC,
        article: ARTICLE,
      }
    });
  };

  const createPost = async ({ alertText }) => {
    dispatch({ type: CREATE_POST_BEGIN });
    try {
      const {
        importance,
        classification,
        type,
        title,
        content,
      } = state;
      await authFetch.post(HANDLE_POST, {
        importance: getUnlocalizedKey(IMPORTANCE, importance),
        classification: getUnlocalizedKey(CLASSIFICATION, classification),
        type: getUnlocalizedKey(TYPE, type),
        title,
        content,
      });

      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: { alertText }
      });
      clearValues();
    } catch (error) {
      if (error.response.status === UNAUTHORIZED) return;
      dispatch({
        type: CREATE_POST_ERROR,
        payload: { message: error.response.data.message },
      });
    }

    clearAlert();
  };

  const buildUrl = ({
    importance,
    classification,
    search,
    sort,
    type,
    page,
  }) => {
    const url = new URLSearchParams();
    if (page) url.append('page', page);
    if (importance !== ALL) url.append('importance', importance);
    if (classification !== ALL) url.append('classification', classification);
    if (type !== ALL) url.append('type', type);
    if (sort) url.append('sort', sort);
    if (search) url.append('search', search);
    return url.toString();
  };

  const getPosts = async () => {
    const {
      page,
      search,
      searchClassification,
      searchType,
      searchImportance,
      sort,
    } = state;

    const url = buildUrl({
      importance: getUnlocalizedKey(IMPORTANCE, searchImportance),
      classification: getUnlocalizedKey(CLASSIFICATION, searchClassification),
      search,
      page,
      type: getUnlocalizedKey(TYPE, searchType),
      sort: getUnlocalizedKey(SORT_CRITERIA, sort),
    });

    dispatch({ type: GET_POSTS_BEGIN });
    try {
      const {
        data: {
          posts,
          totalPosts,
          numOfPages
        }
      } = await authFetch(`${HANDLE_POST}?${url}`);
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts,
          totalPosts,
          numOfPages,
        }
      });
    } catch (error) {
      // Remove the console.log when a proper error handling is implemented
      console.log(error.response);
    }

    clearAlert();
  };

  const setEditPost = id => {
    dispatch({ type: SET_EDIT_POST, payload: { id } });
  };

  const editPost = async ({ alertText }) => {
    dispatch({ type: EDIT_POST_BEGIN });
    try {
      const { importance, classification, type, title, content, editPostId } = state;
      await authFetch.patch(`${HANDLE_POST}/${editPostId}`, {
        importance,
        classification,
        type,
        title,
        content,
      });
      dispatch({
        type: EDIT_POST_SUCCESS,
        payload: { alertText }
      });
      clearValues();
    } catch (error) {
      if (error.response.status === UNAUTHORIZED) return;
      dispatch({
        type: EDIT_POST_ERROR,
        payload: { message: error.response.data.message },
      });
    }

    clearAlert();
  };

  const deletePost = async postId => {
    dispatch({ type: DELETE_POST_BEGIN });
    try {
      await authFetch.delete(`${HANDLE_POST}/${postId}`, { isDeleted: true });
      await getPosts();
    } catch (error) {
      // Remove the console.log when a proper error handling is implemented
      console.log(error.response);
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data: { defaultStats, monthlyPosts } } = await authFetch(`${HANDLE_POST}/stats`);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { defaultStats, monthlyPosts }
      });
    } catch (error) {
      // Remove the console.log when a proper error handling is implemented
      console.log(error.response);
    }
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
      payload: {
        all: ALL,
        latest: LATEST,
      }
    });
  };

  const changePage = page => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
        clearValues,
        createPost,
        getPosts,
        setEditPost,
        deletePost,
        editPost,
        showStats,
        clearFilters,
        changePage,
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
