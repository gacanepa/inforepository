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
} from './actions';

import { ALERT_TYPE_SUCCESS, ALERT_TYPE_ERROR } from '../common/constants';

const reducer = (state, action) => {
  const { type, payload } = action;

  const defaultValues = {
    isEditing: false,
    editPostId: '',
    title: '',
    importance: payload?.low,
    classification: payload?.public,
    type: payload?.article,
    content: '',
  };

  const actions = {
    [DISPLAY_ALERT]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.message,
      alertType: ALERT_TYPE_ERROR,
    }),
    [CLEAR_ALERT]: () => ({
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    }),
    [SETUP_USER_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [UPDATE_USER_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [CREATE_POST_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [GET_POSTS_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [SETUP_USER_SUCCESS]: () => {
      const { user, token, alertText } = payload;

      return {
        ...state,
        user,
        token,
        showAlert: true,
        alertText,
        alertType: ALERT_TYPE_SUCCESS,
        isLoading: false,
      };
    },
    [UPDATE_USER_SUCCESS]: () => {
      const { user, token, alertText } = payload;

      return {
        ...state,
        user,
        token,
        showAlert: true,
        alertText,
        alertType: ALERT_TYPE_SUCCESS,
        isLoading: false,
      };
    },
    [CREATE_POST_SUCCESS]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.alertText,
      alertType: ALERT_TYPE_SUCCESS,
      isLoading: false,
    }),
    [EDIT_POST_SUCCESS]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.alertText,
      alertType: ALERT_TYPE_SUCCESS,
      isLoading: false,
    }),
    [GET_POSTS_SUCCESS]: () => {
      const { posts, totalPosts, numOfPages } = payload;

      return {
        ...state,
        isLoading: false,
        posts,
        totalPosts,
        numOfPages,
      };
    },
    [SET_EDIT_POST]: () => {
      // Need to disable the ESLint rule because _id is an actual property of the post object
      // eslint-disable-next-line no-underscore-dangle
      const post = state.posts.find(p => p._id === payload.id);
      if (post) {
        const { _id, importance, classification, type: postType, title, content } = post;
        return {
          ...state,
          isEditing: true,
          editPostId: _id,
          importance,
          classification,
          type: postType,
          title,
          content,
        };
      }

      return null;
    },
    [SETUP_USER_ERROR]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.message,
      alertType: ALERT_TYPE_ERROR,
      isLoading: false,
    }),
    [UPDATE_USER_ERROR]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.message,
      alertType: ALERT_TYPE_ERROR,
      isLoading: false,
    }),
    [CREATE_POST_ERROR]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.message,
      alertType: ALERT_TYPE_ERROR,
      isLoading: false,
    }),
    [EDIT_POST_ERROR]: () => ({
      ...state,
      showAlert: true,
      alertText: payload.message,
      alertType: ALERT_TYPE_ERROR,
      isLoading: false,
    }),
    [TOGGLE_SIDEBAR]: () => ({
      ...state,
      ...defaultValues,
      showSidebar: !state.showSidebar,
    }),
    [LOGOUT_USER]: () => ({
      ...state,
      user: null,
      token: null,
    }),
    [HANDLE_CHANGE]: () => ({
      ...state,
      [payload.name]: payload.value,
    }),
    [CLEAR_VALUES]: () => ({
      ...state,
      ...defaultValues,
    }),
    [DELETE_POST_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [EDIT_POST_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [SHOW_STATS_BEGIN]: () => ({
      ...state,
      showAlert: false,
      isLoading: true,
    }),
    [DELETE_POST_BEGIN]: () => ({
      ...state,
      isLoading: true,
    }),
    [EDIT_POST_BEGIN]: () => ({
      ...state,
      isLoading: true,
    }),
    [SHOW_STATS_BEGIN]: () => ({
      ...state,
      isLoading: true,
      showStats: false,
    }),
    [SHOW_STATS_SUCCESS]: () => ({
      ...state,
      isLoading: false,
      stats: payload.defaultStats,
      monthlyPosts: payload.monthlyPosts,
    }),
    [CLEAR_FILTERS]: () => ({
      ...state,
      search: '',
      searchClassification: payload.all,
      searchImportance: payload.all,
      searchType: payload.all,
      sort: payload.latest,
    }),
  };

  if (!Object.keys(actions).includes(type)) throw new Error(`No such action: ${type}`);

  return actions[type]();
};

export default reducer;
