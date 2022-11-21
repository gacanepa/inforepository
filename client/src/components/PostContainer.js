import React, { useEffect } from 'react';
import { useTranslationContext } from '../context/TranslationContext';
import { useAppContext } from '../context/AppContext';
import Loading from './Loading';
import Post from './Post';
import PostContainerWrapper from '../assets/wrappers/PostContainerWrapper';

const PostsContainer = () => {
  const {
    getPosts,
    posts,
    isLoading,
    totalPosts,
    searchClassification,
    searchType,
    searchImportance,
    search,
  } = useAppContext();
  const { NO_POSTS_FOUND, FOUND } = useTranslationContext();

  useEffect(() => {
    getPosts();
  }, [searchClassification, searchType, searchImportance, search]);

  if (isLoading) {
    return (
      <Loading center />
    );
  }

  if (posts.length === 0) {
    return (
      <PostContainerWrapper>
        <h2>{NO_POSTS_FOUND}</h2>
      </PostContainerWrapper>
    );
  }

  return (
    <PostContainerWrapper>
      <h5>
        {`${totalPosts} post${totalPosts > 1 ? 's ' : ' '} ${FOUND(totalPosts)}`}
      </h5>
      <div className="posts">
        {posts.map(post => (
          // eslint-disable-next-line no-underscore-dangle, react/jsx-props-no-spreading
          <Post key={post._id} {...post} />
        ))}
      </div>
    </PostContainerWrapper>
  );
};

export default PostsContainer;
