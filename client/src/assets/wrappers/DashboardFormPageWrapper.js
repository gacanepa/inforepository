import styled from 'styled-components';

const DashboardFormPageWrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: block;
    width: 60%;
    margin: 0 auto;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
      margin-left: 1rem;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      align-items: center;
    }
    .btn-container {
      margin-top: 0.5rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center button {
      margin-top: 1rem;
      width: fit-content;
    }
  }
`;

export default DashboardFormPageWrapper;
