import React from 'react';
import { ADD_POST } from '../../common/constants/pages';
import DashboardFormWrapper from '../../assets/wrappers/DashboardFormPageWrapper';

const AddPost = () => (
  <DashboardFormWrapper>
    <h1>{ADD_POST}</h1>
  </DashboardFormWrapper>
);

export default AddPost;
