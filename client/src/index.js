import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import { AppProvider, TranslationProvider } from './context';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TranslationProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </TranslationProvider>
  </React.StrictMode>
);
