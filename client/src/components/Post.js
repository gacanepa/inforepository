import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaLock, FaBookReader, FaLockOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslationContext } from '../context/TranslationContext';
import { useAppContext } from '../context/AppContext';
import PostWrapper from '../assets/wrappers/PostWrapper';
import PostInfo from './PostInfo';

const Post = ({
  _id,
  title,
  importance,
  classification,
  content,
  createdBy,
  updatedAt,
}) => {
  const { setEditPost, deletePost } = useAppContext();
  const {
    EDIT,
    DELETE,
    LAST_UPDATED,
    IMPORTANCE,
    CLASSIFICATION,
  } = useTranslationContext();
  const { firstName, lastName } = createdBy;

  const getLocalizedValue = (arr, value) => {
    const localizedObj = arr.find(obj => Object.keys(obj)[0] === value);
    return Object.values(localizedObj)[0];
  };

  const lastUpdated = new Date(updatedAt).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  return (
    <PostWrapper>
      <header>
        <div className="main-icon">{firstName.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{`${firstName} ${lastName}`}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PostInfo
            icon={classification === 'Public' ? <FaLockOpen /> : <FaLock />}
            text={getLocalizedValue(CLASSIFICATION, classification)}
          />
          <PostInfo icon={<FaCalendarAlt />} text={`${LAST_UPDATED} ${lastUpdated}`} />
          <PostInfo icon={<FaBookReader />} text={content} />
          <div
            className={`status ${importance.toLowerCase()}`}
          >
            {getLocalizedValue(IMPORTANCE, importance)}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link to="/add-post" className="btn edit-btn" onClick={() => setEditPost(_id)}>
              {EDIT}
            </Link>
            <button type="button" className="btn delete-btn" onClick={() => deletePost(_id)}>
              {DELETE}
            </button>
          </div>
        </footer>
      </div>
    </PostWrapper>
  );
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  importance: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdBy: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default Post;
