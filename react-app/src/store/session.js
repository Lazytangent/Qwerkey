import api from './api';
import { SET_SESSION, REMOVE_SESSION } from './constants';
import { setSession, removeSession } from './actions';

export const authenticate = () => async (dispatch) => {
  try {
    const response = await api('/api/auth');
    const user = await response.json();
    if (!user.errors) {
      dispatch(setSession(user));
    }
    return user;
  } catch (e) {
    return e;
  }
};

export const demoUserLogin = () => async (dispatch) => {
  const payload = { credential: 'Demo', password: 'password' };
  const response = await api('/api/auth/login', 'POST', payload);
  const user = await response.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    dispatch(removeSession());
  }
  return await response.json();
};

export const signUp = (username, email, password, confirm) => async (
  dispatch
) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm,
    }),
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

export const savePost = (userId, postId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/save/post/${postId}`);
  const user = await res.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

export const saveComment = (userId, commentId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/save/comment/${commentId}`);
  const user = await res.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.user };
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
