import React from 'react';
import i18next from 'i18next';

const SwitchLanguage = () => (
  <div className="language-switch">
    <button
      type="button"
      onClick={() => i18next.changeLanguage('en')}
      className="btn-link"
    >
      English
    </button>
    <span>|</span>
    <button
      type="button"
      onClick={() => i18next.changeLanguage('es')}
      className="btn-link"
    >
      Español
    </button>
  </div>
);

export default SwitchLanguage;
