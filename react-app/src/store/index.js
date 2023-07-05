import { configureStore } from '@reduxjs/toolkit';

import session from './session';
import posts from './posts';
import comments from './comments';
import retailers from './retailers';
import search from './search';
import communities from './communities';
import sidebar from './sidebar';
import users from './users';
import meetups from './meetups';

export const store = configureStore({
  reducer: {
    session,
    posts,
    comments,
    retailers,
    search,
    communities,
    sidebar,
    users,
    meetups,
  },
});
