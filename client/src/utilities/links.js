import React from 'react';

import {
  MdArticle,
  MdBarChart,
  MdQueryStats,
  MdManageAccounts
} from 'react-icons/md';

const links = [
  {
    id: 1,
    text: 'Stats',
    path: '/stats',
    icon: <MdBarChart />,
  },
  {
    id: 2,
    text: 'All_Posts',
    path: '/',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Add_Post',
    path: '/add-post',
    icon: <MdArticle />,
  },
  {
    id: 4,
    text: 'Profile',
    path: '/profile',
    icon: <MdManageAccounts />,
  },
];

export default links;
