import React from 'react';
import PropTypes from 'prop-types';
import PostInfoWrapper from '../assets/wrappers/PostInfoWrapper';

const PostInfo = ({ icon, text }) => (
  <PostInfoWrapper>
    <span className="icon">{icon}</span>
    <span className="text">{text}</span>
  </PostInfoWrapper>
);

PostInfo.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default PostInfo;
