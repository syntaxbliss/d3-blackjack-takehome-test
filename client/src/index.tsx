import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppContainer } from './containers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
