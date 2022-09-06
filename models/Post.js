import mongoose from "mongoose";
import {
  POST_REQUIRES_USER,
  IMPORTANCE,
  LOW,
  CLASSIFICATION,
  PUBLIC,
  IS_REQUIRED,
  TITLE,
  CONTENT,
  TYPE,
  ARTICLE,
  MIN_LENGTH,
  MAX_LENGTH,
  CHARACTERS,
} from './constants.js'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `${TITLE} ${IS_REQUIRED}`],
    minlength: [10, `${TITLE} ${MIN_LENGTH} 10 ${CHARACTERS}`],
    maxlength: [50, `${TITLE} ${MAX_LENGTH} 50 ${CHARACTERS}`],
    trim: true,
  },
  importance: {
    type: String,
    enum: IMPORTANCE,
    default: LOW,
  },
  classification: {
    type: String,
    enum: CLASSIFICATION,
    default: PUBLIC,
  },
  type: {
    type: String,
    enum: TYPE,
    default: ARTICLE,
  },
  content: {
    type: String,
    required: [true, `${CONTENT} ${IS_REQUIRED}`],
    minlength: [20, `${CONTENT} ${MIN_LENGTH} 20 ${CHARACTERS}`],
    maxlength: [1000, `${CONTENT} ${MAX_LENGTH} 1000 ${CHARACTERS}`],
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, POST_REQUIRES_USER],
  },
  // The default post type is article, which does not have a due date (only tasks do)
  dueDate: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
