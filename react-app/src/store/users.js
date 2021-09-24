import { SET_MORE_USERS, SET_USERS, SET_USER, SET_MAX_USERS } from './constants';

const setMaxNumberOfUsers = (number) => {
  return {
    type: SET_MAX_USERS,
    number,
  };
};

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const setMoreUsers = (users) => {
  return {
    type: SET_MORE_USERS,
    users,
  };
};

export const getUsers = (page) => async (dispatch) => {
  const res = await fetch(`/api/users?page=${page}`);
  const users = await res.json();
  if (page === 1) {
    dispatch(setUsers(users));
  } else {
    dispatch(setMoreUsers(users));
  }
  return users;
};

export const getUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  const user = await res.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const getMaxNumberOfUsers = () => async (dispatch) => {
  const res = await fetch('/api/users/max');
  const number = await res.json();
  dispatch(setMaxNumberOfUsers(number.max));
  return number;
};

const initialState = {
  byIds: {},
  max: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const user = {
        ...action.user,
        posts: action.user.posts.map((post) => post.id),
      };
      return { ...state, byIds: { ...state.byIds, [action.user.id]: user } };
    case SET_USERS:
      return { ...state, byIds: { ...action.users } };
    case SET_MORE_USERS:
      return { ...state, byIds: { ...state.byIds, ...action.users } };
    case SET_MAX_USERS:
      return { ...state, max: action.number };
    default:
      return state;
  }
};

export default usersReducer;
