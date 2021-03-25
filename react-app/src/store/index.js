import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import postsReducer from './posts';
import commentsReducer from "./comments";
import retailersReducer from './retailers';
import searchReducer from "./search";
import communitiesReducer from "./communities";
import sidebarReducer from "./sidebar";
import usersReducer from "./users";
import meetupsReducer from "./meetups";

const rootReducer = combineReducers({
  session: sessionReducer,
  posts: postsReducer,
  comments: commentsReducer,
  retailers: retailersReducer,
  search: searchReducer,
  communities: communitiesReducer,
  sidebar: sidebarReducer,
  users: usersReducer,
  meetups: meetupsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
