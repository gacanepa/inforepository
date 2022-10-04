import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ title, createdAt }) => {
  const postDate = new Date(createdAt).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  return (
    <div>
      <h4>{title}</h4>
      <h5>{postDate}</h5>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
