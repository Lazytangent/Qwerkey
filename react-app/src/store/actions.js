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

  SET_MORE_MEETUPS,
  SET_MAX_MEETUPS,
  REMOVE_MEETUP,
  SET_MEETUPS,
  SET_MEETUP,

  SET_MORE_RETAILERS,
  SET_RETAILER,
  SET_RETAILERS,
  SET_MAX_RETAILERS,
  REMOVE_RETAILER,

  SET_COMMUNITIES,
  SET_COMMUNITY,

  SET_COMMENTS,
  SET_COMMENT,
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

// Posts Actions
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

// Comments Actions
export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    comments,
  };
};

export const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment,
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

// Meetup Actions
export const setMoreMeetups = (meetups) => {
  return {
    type: SET_MORE_MEETUPS,
    meetups,
  };
};

export const setMaxNumberOfMeetups = (number) => {
  return {
    type: SET_MAX_MEETUPS,
    number,
  };
};

export const removeMeetup = (id) => {
  return {
    type: REMOVE_MEETUP,
    id,
  };
};

export const setMeetups = (meetups) => {
  return {
    type: SET_MEETUPS,
    meetups,
  };
};

export const setMeetup = (meetup) => {
  return {
    type: SET_MEETUP,
    meetup,
  };
};

// Retailer Actions
export const removeRetailer = (id) => {
  return {
    type: REMOVE_RETAILER,
    id,
  };
};

export const setMaxNumberOfRetailers = (number) => {
  return {
    type: SET_MAX_RETAILERS,
    number,
  };
};

export const setMoreRetailers = (retailers) => {
  return {
    type: SET_MORE_RETAILERS,
    retailers,
  };
};

export const setRetailers = (retailers) => {
  return {
    type: SET_RETAILERS,
    retailers,
  };
};

export const setRetailer = (retailer) => {
  return {
    type: SET_RETAILER,
    retailer,
  };
};

// Communities Actions
export const setCommunities = (communities) => {
  return {
    type: SET_COMMUNITIES,
    communities,
  };
};

export const setCommunity = (community) => {
  return {
    type: SET_COMMUNITY,
    community,
  };
};
