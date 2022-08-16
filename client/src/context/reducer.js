import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from './actions';

import {
  ALERT_TYPE_SUCCESS,
  ALERT_TYPE_ERROR,
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

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
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

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_TYPE_ERROR,
      alertText: action.payload.message,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
