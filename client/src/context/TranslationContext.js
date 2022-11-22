import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TranslationContext = React.createContext();

const TranslationProvider = ({ children }) => {
  const { t } = useTranslation();

  return (
    <TranslationContext.Provider
      value={{
        MONTHS: t('MONTHS'),
        SITE_TITLE: t('SITE_TITLE'),
        LANDING: t('LANDING'),
        LOGIN: t('LOGIN'),
        REGISTER: t('REGISTER'),
        EMAIL: t('EMAIL'),
        PASSWORD: t('PASSWORD'),
        LOCATION: t('LOCATION'),
        IMPORTANCE_LABEL: t('IMPORTANCE_LABEL'),
        CLASSIFICATION_LABEL: t('CLASSIFICATION_LABEL'),
        TYPE_LABEL: t('TYPE_LABEL'),
        LOGOUT: t('LOGOUT'),
        PROFILE: t('PROFILE'),
        INTRO_TEXT: t('INTRO_TEXT'),
        DASHBOARD: t('DASHBOARD'),
        NOT_FOUND: t('NOT_FOUND'),
        BACK_TO_HOME: t('BACK_TO_HOME'),
        SUBMIT: t('SUBMIT'),
        CLEAR: t('CLEAR'),
        NOT_A_MEMBER_YET: t('NOT_A_MEMBER_YET'),
        ALREADY_A_MEMBER: t('ALREADY_A_MEMBER'),
        MISSING_VALUES: t('MISSING_VALUES'),
        PASSWORD_MISMATCH: t('PASSWORD_MISMATCH'),
        REENTER_PASSWORD: t('REENTER_PASSWORD'),
        ALERT_USER_CREATED: t('ALERT_USER_CREATED'),
        ALERT_USER_LOGIN_SUCCESS: t('ALERT_USER_LOGIN_SUCCESS'),
        UPDATE_USER_SUCCESS: t('UPDATE_USER_SUCCESS'),
        ALERT_POST: t('ALERT_POST'),
        CREATED: t('CREATED'),
        UPDATED: t('UPDATED'),
        FIRST_NAME: t('FIRST_NAME'),
        LAST_NAME: t('LAST_NAME'),
        ADD: t('ADD'),
        EDIT: t('EDIT'),
        DELETE: t('DELETE'),
        POST: t('POST'),
        PLEASE_WAIT: t('PLEASE_WAIT'),
        SAVE_CHANGES: t('SAVE_CHANGES'),
        UNAUTHORIZED: t('UNAUTHORIZED'),
        NO_POSTS_FOUND: t('NO_POSTS_FOUND'),
        LAST_UPDATED: t('LAST_UPDATED'),
        CRITICAL: t('CRITICAL'),
        HIGH: t('HIGH'),
        MEDIUM: t('MEDIUM'),
        LOW: t('LOW'),
        // Mapping from the backend to the localized values
        IMPORTANCE: [
          { Low: t('LOW') },
          { Medium: t('MEDIUM') },
          { High: t('HIGH') },
          { Critical: t('CRITICAL') },
        ],
        ARTICLE: t('ARTICLE'),
        TASK: t('TASK'),
        // Mapping from the backend to the localized values
        TYPE: [
          { Article: t('ARTICLE') },
          { Task: t('TASK') },
        ],
        PUBLIC: t('PUBLIC'),
        PRIVATE: t('PRIVATE'),
        // Mapping from the backend to the localized values
        CLASSIFICATION: [
          { Public: t('PUBLIC') },
          { Private: t('PRIVATE') },
        ],
        TITLE: t('TITLE'),
        CONTENT: t('CONTENT'),
        SIDEBAR_LINKS: [
          { Stats: t('STATS') },
          { Profile: t('PROFILE') },
          { Add_Post: t('ADD_POST') },
          { All_Posts: t('ALL_POSTS') },
        ],
        FOR_ORGANIZATIONS: t('FOR_ORGANIZATIONS'),
        MONTHLY_POSTS: t('MONTHLY_POSTS'),
        MONTH: t('MONTH'),
        COUNT: t('COUNT'),
        ALL: t('ALL'),
        LATEST: t('LATEST'),
        OLDEST: t('OLDEST'),
        SEARCH_FORM: t('SEARCH_FORM'),
        SEARCH_LABEL: t('SEARCH_LABEL'),
        SORT_LABEL: t('SORT_LABEL'),
        CLEAR_FILTERS: t('CLEAR_FILTERS'),
        FOUND: t('FOUND'),
        PREV: t('PREV'),
        NEXT: t('NEXT'),
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

const useTranslationContext = () => useContext(TranslationContext);

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TranslationProvider, useTranslationContext };
