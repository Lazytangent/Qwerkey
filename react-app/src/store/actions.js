import {
  SET_SESSION,
  REMOVE_SESSION,

  SET_MORE_POSTS,
  SET_POSTS,
  SET_POST,
  SET_MAX_POSTS,
  SET_ORDER,

  SET_MORE_USERS,
  SET_USERS,
  SET_USER,
  SET_MAX_USERS,

  SET_SEARCH,
} from "./constants";

// Session Actions
export const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

export const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

export const setOrderOfPosts = (array) => {
  return {
    type: SET_ORDER,
    array,
  };
};

export const setMaxNumberOfPosts = (number) => {
  return {
    type: SET_MAX_POSTS,
    number,
  };
};

export const setMorePosts = (posts) => {
  return {
    type: SET_MORE_POSTS,
    posts,
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    posts,
  };
};

export const setPost = (post) => {
  return {
    type: SET_POST,
    post,
  };
};

// Users Actions
export const setMaxNumberOfUsers = (number) => {
  return {
    type: SET_MAX_USERS,
    number,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setMoreUsers = (users) => {
  return {
    type: SET_MORE_USERS,
    users,
  };
};

// Search Actions
export const setSearch = (data) => ({
  type: SET_SEARCH,
  ...data,
});
