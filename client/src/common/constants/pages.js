/* eslint-disable max-len */
export const SITE_TITLE = 'Information Repository';
export const LANDING = 'Landing';
export const INTRO_TEXT = 'Dreamcatcher butcher knausgaard aute skateboard chartreuse shabby chic chambray man braid. Et put a bird on it chambray health goth.';
export const LOGIN = 'Login';
export const REGISTER = 'Register';
export const ERROR = 'Error';
export const DASHBOARD = 'Dashboard';
export const NOT_FOUND = 'We cannot find the page you are looking for';
export const BACK_TO_HOME = 'Back to home';
export const SUBMIT = 'Submit';
export const CLEAR = 'Clear';
export const NOT_A_MEMBER_YET = 'Not a member yet?';
export const ALREADY_A_MEMBER = 'Already a member?';
export const MISSING_VALUES = 'Please fill in all the fields';
export const PASSWORD_MISMATCH = 'Passwords do not match';
export const REENTER_PASSWORD = 'Re-enter Password';
export const CLEAR_ALERT_DELAY = 3000;
export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_USER_CREATED = 'Your account has been created! Redirecting...';
export const ALERT_USER_LOGIN_SUCCESS = 'Login successful! Redirecting...';
export const UPDATE_USER_SUCCESS = 'User updated successfully';
export const ALERT_TYPE_ERROR = 'danger';
export const FIRST_NAME = 'First Name';
export const LAST_NAME = 'Last Name';
export const ADD = 'Add';
export const EDIT = 'Edit';
export const POST = 'Post';
export const ADD_POST = `${ADD} ${POST}`;
export const EDIT_POST = `${EDIT} ${POST}`;
export const ALL_POSTS = `All ${POST}s`;
export const PROFILE = 'Profile';
export const STATS = 'Stats';
export const LOGOUT = 'Logout';
export const PLEASE_WAIT = 'Please wait...';
export const SAVE_CHANGES = 'Save Changes';
export const UNAUTHORIZED = 401;

// These are the same constants that are defined for the Post model in the backend
// Need to find a way to share them between the two projects to avoid duplicates
export const CRITICAL = 'Critical';
export const HIGH = 'High';
export const MEDIUM = 'Medium';
export const LOW = 'Low';
export const IMPORTANCE = [CRITICAL, HIGH, MEDIUM, LOW];
export const PUBLIC = 'Public';
export const PRIVATE = 'Private';
export const CLASSIFICATION = [PUBLIC, PRIVATE];
export const TITLE = 'Title';
export const CONTENT = 'Content';
export const TASK = 'Task';
export const ARTICLE = 'Article';
export const TYPE = [TASK, ARTICLE];
