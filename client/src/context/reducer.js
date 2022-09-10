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

  if ([SETUP_USER_BEGIN, UPDATE_USER_BEGIN].includes(action.type)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if ([SETUP_USER_SUCCESS, UPDATE_USER_SUCCESS].includes(action.type)) {
    const { user, token } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      showAlert: true,
      alertType: ALERT_TYPE_SUCCESS,
      alertText: action.payload.alertText,
    };
  }

  if ([SETUP_USER_ERROR, UPDATE_USER_ERROR].includes(action.type)) {
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

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
