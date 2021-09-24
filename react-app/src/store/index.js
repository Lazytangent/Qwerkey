import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import session from './session';
import posts from './posts';
import comments from "./comments";
import retailers from './retailers';
import search from "./search";
import communities from "./communities";
import sidebar from "./sidebar";
import users from "./users";
import meetups from "./meetups";

const rootReducer = combineReducers({
  session,
  posts,
  comments,
  retailers,
  search,
  communities,
  sidebar,
  users,
  meetups,
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
