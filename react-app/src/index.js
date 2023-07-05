import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { store } from './store';
import ContextProvider from './context';

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
