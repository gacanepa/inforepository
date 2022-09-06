// Common
export const IS_REQUIRED = 'is required';
export const NOT_VALID = 'is not valid';
export const MIN_LENGTH = 'must be at least';
export const MAX_LENGTH = 'must be at most';
export const CHARACTERS = 'characters long';
export const MUST_BE_UNIQUE = 'must be unique';

// User constants
export const STRONG_PASSWORD = 'The minimum length is 8 characters. It must contain at least one number and a symbol, one uppercase and one lowercase letter.';
export const FIRST_NAME = 'First name';
export const LAST_NAME = 'Last name';
export const SALT_ROUNDS = 10;

// Post constants
// These are the same constants that are defined in the frontend
// Need to find a way to share them between the two projects to avoid duplicates
export const POST_REQUIRES_USER = 'Please provide the owner of this post';
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
