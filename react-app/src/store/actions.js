import {
  SET_SESSION,
  REMOVE_SESSION,
  SET_MORE_POSTS,
  SET_POSTS,
  SET_POST,
  SET_MAX_POSTS,
  SET_ORDER,
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
