import React, { useEffect } from 'react';
import { useTranslationContext } from '../context/TranslationContext';
import { useAppContext } from '../context/AppContext';
import Loading from './Loading';
import Post from './Post';
import PostContainerWrapper from '../assets/wrappers/PostContainerWrapper';
import PageButtonContainer from './PageButtonContainer';

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
    sort,
    numOfPages,
    page,
  } = useAppContext();
  const { NO_POSTS_FOUND, FOUND } = useTranslationContext();

  useEffect(() => {
    getPosts();
  }, [page, searchClassification, searchType, searchImportance, search, sort]);

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
      {/* Display the pagination buttons only if there are 2 or more pages */}
      {numOfPages > 1 && <PageButtonContainer />}
    </PostContainerWrapper>
  );
};

export default PostsContainer;
