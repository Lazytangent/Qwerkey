export const SET_SESSION = 'session/SET_SESSION';
export const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const authenticate = () => async (dispatch) => {
  try {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential: 'Demo',
      password: 'password',
    })
  });
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setSession(user));
  }
  return user;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (response.ok) {
    dispatch(removeSession());
  }
  return await response.json();
};

export const signUp = (username, email, password, confirm) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirm
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
