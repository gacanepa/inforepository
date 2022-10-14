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
} from './actions';

import {
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_ERROR,
  LOW,
  PUBLIC,
  ARTICLE,
} from '../common/constants/pages';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.message,
      alertType: 'danger',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    };
  }

  if ([
    SETUP_USER_BEGIN,
    UPDATE_USER_BEGIN,
    CREATE_POST_BEGIN,
    GET_POSTS_BEGIN,
  ].includes(action.type)) {
    return {
      ...state,
      showAlert: false,
      isLoading: true,
    };
  }

  if ([SETUP_USER_SUCCESS, UPDATE_USER_SUCCESS].includes(action.type)) {
    const { user, token, alertText } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      showAlert: true,
      alertType: ALERT_TYPE_SUCCESS,
      alertText,
    };
  }

  if (action.type === CREATE_POST_SUCCESS) {
    const { alertText } = action.payload;
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_TYPE_SUCCESS,
      alertText,
    };
  }

  if (action.type === GET_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
      totalPosts: action.payload.totalPosts,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_POST) {
    // Need to disable the ESLint rule because _id is an actual property of the post object
    // eslint-disable-next-line no-underscore-dangle
    const post = state.posts.find(p => p._id === action.payload.id);
    if (post) {
      const { _id, importance, classification, type, title, content } = post;
      return {
        ...state,
        isEditing: true,
        editPostId: _id,
        importance,
        classification,
        type,
        title,
        content,
      };
    }
  }

  if ([SETUP_USER_ERROR, UPDATE_USER_ERROR, CREATE_POST_ERROR].includes(action.type)) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_TYPE_ERROR,
      alertText: action.payload.message,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const defaultValues = {
      isEditing: false,
      editPostId: '',
      title: '',
      importance: LOW,
      classification: PUBLIC,
      type: ARTICLE,
      content: '',
    };

    return {
      ...state,
      ...defaultValues,
    };
  }

  if (action.type === DELETE_POST_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
