import styled from 'styled-components';

const PostInfoWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  overflow: hidden;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    min-width: 0;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(90%);
  }
`;

export default PostInfoWrapper;
