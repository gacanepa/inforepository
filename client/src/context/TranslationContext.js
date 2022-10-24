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
        CLEAR_ALERT_DELAY: t('CLEAR_ALERT_DELAY'),
        ALERT_TYPE_SUCCESS: t('ALERT_TYPE_SUCCESS'),
        ALERT_USER_CREATED: t('ALERT_USER_CREATED'),
        ALERT_USER_LOGIN_SUCCESS: t('ALERT_USER_LOGIN_SUCCESS'),
        UPDATE_USER_SUCCESS: t('UPDATE_USER_SUCCESS'),
        ALERT_POST: t('ALERT_POST'),
        CREATED: t('CREATED'),
        UPDATED: t('UPDATED'),
        ALERT_TYPE_ERROR: t('ALERT_TYPE_ERROR'),
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
        IMPORTANCE: [
          t('CRITICAL'),
          t('HIGH'),
          t('MEDIUM'),
          t('LOW'),
        ],
        ARTICLE: t('ARTICLE'),
        TASK: t('TASK'),
        TYPE: [
          t('ARTICLE'),
          t('TASK'),
        ],
        PUBLIC: t('PUBLIC'),
        PRIVATE: t('PRIVATE'),
        CLASSIFICATION: [
          t('PUBLIC'),
          t('PRIVATE'),
        ],
        TITLE: t('TITLE'),
        CONTENT: t('CONTENT'),
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