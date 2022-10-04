import React from 'react';
import PropTypes from 'prop-types';
import { FaBookOpen, FaLock, FaListUl, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PostWrapper from '../assets/wrappers/PostWrapper';
import PostInfo from './PostInfo';

const Post = ({
  title,
  importance,
  classification,
  type,
  content,
  createdBy,
  createdAt
}) => {
  const { setEditPost, deletePost } = useAppContext();
  const { firstName, lastName } = createdBy;

  const postDate = new Date(createdAt).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  return (
    <PostWrapper>
      <header>
        <div className="main-icon">{importance.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{`${firstName} ${lastName}`}</p>
        </div>
      </header>
    </PostWrapper>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  importance: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
