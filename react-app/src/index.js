import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureStore from './store';
import ModalProvider from './context/ModalContext';
import AuthProvider from './context/AuthContext';
import CreatePostProvider from './context/CreatePostContext';
import CommentProvider from './context/CommentContext';
import DarkModeProvider from './context/DarkModeContext';
import RetailerRatingProvider from './context/RetailerRatingContext';
import CollapsedSidebarProvider from './context/CollapsedSidebarContext';
import SearchProvider from './context/SearchContext';

import * as sessionActions from './store/session';
import * as userActions from './store/users';
import * as postActions from './store/posts';
import * as retailerActions from './store/retailers';
import * as searchActions from './store/search';
import * as communityActions from './store/communities';
import * as sidebarActions from './store/sidebar';
import * as meetupActions from './store/meetups';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.userActions = userActions;
  window.postActions = postActions;
  window.retailerActions = retailerActions;
  window.searchActions = searchActions;
  window.communityActions = communityActions;
  window.sidebarActions = sidebarActions;
  window.meetupActions = meetupActions;
}

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <AuthProvider>
          <CreatePostProvider>
            <CommentProvider>
              <DarkModeProvider>
                <RetailerRatingProvider>
                  <CollapsedSidebarProvider>
                    <SearchProvider>
                      <App />
                    </SearchProvider>
                  </CollapsedSidebarProvider>
                </RetailerRatingProvider>
              </DarkModeProvider>
            </CommentProvider>
          </CreatePostProvider>
        </AuthProvider>
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
