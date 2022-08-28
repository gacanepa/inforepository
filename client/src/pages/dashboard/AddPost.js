import React from 'react';
import { ADD_POST } from '../../common/constants/pages';
import DashboardFormPageWrapper from '../../assets/wrappers/DashboardFormPageWrapper';

const AddPost = () => (
  <DashboardFormPageWrapper>
    <h3>{ADD_POST}</h3>
  </DashboardFormPageWrapper>
);

export default AddPost;
